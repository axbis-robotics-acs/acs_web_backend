import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

export const mqttClient: ClientProxy = ClientProxyFactory.create({
  transport: Transport.MQTT,
  options: {
    url: 'mqtt://localhost:1883', // 브로커 주소
    clientId: 'nest-client-' + Math.random().toString(16).slice(2),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    // username: 'yourUsername',
    // password: 'yourPassword',
  },
});
