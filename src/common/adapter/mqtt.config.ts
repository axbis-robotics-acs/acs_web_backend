// mqtt.config.ts
import { MqttOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

const mqttScheme = 'mqtt://';
const mqttHost = process.env.MQTT_URL || 'localhost';
const mqttPort = process.env.MQTT_PORT || '1883'; // 포트도 환경변수로 관리 추천
const username = process.env.MQTT_USERNAME?.trim();
const password = process.env.MQTT_PASSWORD?.trim();

const mqttsScheme = 'mqtts://';
const mqttOmronHost = process.env.MQTT_OMRON_URL || 'localhost';
const mqttOmronPort = process.env.MQTT_OMRON_PORT || '1883'; // 포트도 환경변수로 관리 추천
const mqttOmronusername = process.env.MQTT_OMRON_USERNAME?.trim();
const mqttOmronpassword = process.env.MQTT_OMRON_PASSWORD?.trim();
export const mqttUrl = `${mqttScheme}${mqttHost}:${mqttPort}`;
export const mqttsUrl = `${mqttsScheme}${mqttOmronHost}:${mqttOmronPort}`;

console.log('MQTT URL:', mqttUrl);
console.log('MQTTS URL:', mqttsUrl);

export const mqttInternalSubscribeConfig = (clientId) => {
  return {
    clientId: 'nest-client-' + clientId + +Math.random().toString(16).slice(2),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    username: username,
    password: password,
  };
};

export const mqttInternalPublisherConfig = (clientId) => {
  return {
    clientId: 'nest-client-' + clientId + +Math.random().toString(16).slice(2),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    username: username,
    password: password,
  };
};

export const mqttServerOptions: MqttOptions = {
  transport: Transport.MQTT,
  options: {
    url: mqttUrl,
    ...mqttInternalSubscribeConfig('subscribe_internal'),
  },
};

//////  OMRON Setting

export const mqttOmronSubscribeOptions = {
  clientId: 'nest-client-subscribe' + Math.random().toString(16).slice(2),
  username: mqttOmronusername,
  password: mqttOmronpassword,
  protocolVersion: 4 as const, // MQTT 3.1.1
  clean: true,
  keepalive: 60,
  reconnectPeriod: 1000,
  connectTimeout: 30_000,
  rejectUnauthorized: false,
  secureProtocol: 'TLSv1_2_method',
};

export const mqttOmronPublisherOptions = {
  clientId: 'nest-client-publisher' + Math.random().toString(16).slice(2),
  username: mqttOmronusername,
  password: mqttOmronpassword,
  protocolVersion: 4 as const, // MQTT 3.1.1
  clean: true,
  keepalive: 60,
  reconnectPeriod: 1000,
  connectTimeout: 30_000,
  rejectUnauthorized: false,
  secureProtocol: 'TLSv1_2_method',
};

export const mqttOmronServerOptions: MqttOptions = {
  transport: Transport.MQTT,
  options: {
    url: mqttsUrl,
    ...mqttOmronSubscribeOptions,
  },
};
