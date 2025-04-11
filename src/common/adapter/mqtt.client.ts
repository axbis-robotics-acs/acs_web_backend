import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

const mqttScheme = 'mqtt://';
const mqttHost = process.env.MQTT_URL || 'localhost';
const mqttPort = process.env.MQTT_PORT || '1883'; // 포트도 환경변수로 관리 추천
const mqttUrl = `${mqttScheme}${mqttHost}:${mqttPort}`;

export const mqttClient: ClientProxy = ClientProxyFactory.create({
  transport: Transport.MQTT,
  options: {
    url: mqttUrl,
    clientId: 'nest-client-' + Math.random().toString(16).slice(2),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  },
});
