import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filter/custom.filter';
import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import { SessionIdInterceptor } from './common/interceptor/SessionInterceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS 허용 설정
  app.enableCors({
    origin: 'http://localhost:3000', // 프론트엔드 주소
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, session_id',
  });

  // ✅ 정적 파일 제공 (변환된 glTF 파일 접근 가능)
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SessionIdInterceptor());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: false,
      rolling: true, // 세션 갱신
      cookie: {
        maxAge: 1000 * 60 * 60, // 1시간
        httpOnly: true,
      },
    }),
  );

  // ✅ Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('ACS API Docs')
    .setDescription('API 문서.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // http://localhost:4000/docs
  writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
