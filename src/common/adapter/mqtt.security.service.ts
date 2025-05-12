// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import { mqttSecurityClient } from './mqtt.client';

@Injectable()
export class MqttsecurityService {
  publish(topic: string, payload: any, qos) {
    const qosLevel = qos as 0 | 1 | 2; // ✅ 타입 단언으로 안정성 확보
    const message =
      typeof payload === 'string' ? payload : JSON.stringify(payload);
    mqttSecurityClient.publish(topic, message, { qos: qosLevel }, (err) => {
      if (err) {
        console.error(`[MQTT] Publish failed to ${topic}`, err);
      } else {
        console.log(`[MQTT] Published to ${topic}`);
      }
    });
  }
}
