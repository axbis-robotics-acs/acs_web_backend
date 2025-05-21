// mqtt.publisher.service.ts
import { Injectable } from '@nestjs/common';
import { MqttClientService } from './mqtt.client.service';

@Injectable()
export class MqttPublishService {
  constructor(private readonly mqttConn: MqttClientService) {}

  publishInternal(topic: string, payload: any, qos: 0 | 1 | 2 = 0) {
    const message =
      typeof payload === 'string' ? payload : JSON.stringify(payload);
    this.mqttConn.publishInternal(topic, message, { qos });
  }

  publishOmron(topic: string, payload: any, qos: 0 | 1 | 2 = 0) {
    const message =
      typeof payload === 'string' ? payload : JSON.stringify(payload);
    this.mqttConn.publishOmron(topic, message, { qos });
  }
}
