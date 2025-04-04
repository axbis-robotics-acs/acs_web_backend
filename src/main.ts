import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS 허용 설정
  app.enableCors({
    origin: "http://localhost:3000", // 프론트엔드 주소
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  // ✅ 정적 파일 제공 (변환된 glTF 파일 접근 가능)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);

}
bootstrap();
