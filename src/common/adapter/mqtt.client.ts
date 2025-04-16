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
export const mqttUrl = `${mqttScheme}${mqttHost}:${mqttPort}`;
export const robotStatusRequestTopic = 'robot/status/request';
export const middlewareTaskResponseTopic = 'middleware/task/response';
export const middlewareConnectionResponseTopic =
  'middleware/connection/response';

console.log(
  '[MQTT] MQTT URL:',
  mqttUrl,
  'MQTT_USERNAME:',
  process.env.MQTT_USERNAME,
  'MQTT_PASSWORD:',
  process.env.MQTT_PASSWORD,
);

export const mqttConfig = (clientId) => {
  return {
    clientId: 'nest-client-' + clientId + +Math.random().toString(16).slice(2),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    username: process.env.MQTT_USERNAME?.trim(),
    password: process.env.MQTT_PASSWORD?.trim(),
  };
};

export const mqttClient: ClientProxy = ClientProxyFactory.create({
  transport: Transport.MQTT,
  options: {
    url: mqttUrl,
    ...mqttConfig('mqtt-client'),
  },
});
