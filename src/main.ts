import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/utils/filter/custom.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mqttScheme = 'mqtt://';
  const mqttHost = process.env.MQTT_URL || 'localhost';
  const mqttPort = process.env.MQTT_PORT || '1883'; // 포트도 환경변수로 관리 추천
  const mqttUrl = `${mqttScheme}${mqttHost}:${mqttPort}`;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: mqttUrl,
      clientId: 'nest-subscriber-' + Math.random().toString(16).slice(2),
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    },
  });

  await app.startAllMicroservices();

  // ✅ CORS 허용 설정
  app.enableCors({
    origin: 'http://localhost:3000', // 프론트엔드 주소
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // ✅ 정적 파일 제공 (변환된 glTF 파일 접근 가능)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalFilters(new AllExceptionsFilter());

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
