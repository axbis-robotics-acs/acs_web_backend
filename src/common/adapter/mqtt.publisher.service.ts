import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { mqttClient, mqttConfig, mqttUrl } from './mqtt.client';
import { lastValueFrom } from 'rxjs';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttPublisher implements OnModuleInit, OnModuleDestroy {
  private rawMqttClient: mqtt.MqttClient;

  async onModuleInit() {
    await mqttClient.connect();

    this.rawMqttClient = mqtt.connect(mqttUrl, {
      ...mqttConfig('mqtt-raw-pub'),
    });

    this.rawMqttClient.on('connect', () => {
      console.log('[RAW MQTT] Connected to broker');
    });

    this.rawMqttClient.on('error', (err) => {
      console.error('[RAW MQTT] Error:', err);
    });
  }

  async onModuleDestroy() {
    await mqttClient.close();
    if (this.rawMqttClient?.connected) {
      this.rawMqttClient.end();
    }
  }

  // NestJS 시스템 간 메시지용
  async publish(topic: string, payload: any): Promise<void> {
    await lastValueFrom(mqttClient.send(topic, payload));
    // console.log(`[MQTT PUB:Nest] Topic: ${topic}, Payload:`, payload);
  }

  // 외부 장치로 순수 MQTT 메시지 발행
  rawPublish(topic: string, payload: any, qos: number): void {
    const message =
      typeof payload === 'string' ? payload : JSON.stringify(payload);
    const qosLevel = qos as 0 | 1 | 2;
    if (this.rawMqttClient?.connected) {
      this.rawMqttClient.publish(topic, message, { qos: qosLevel }, (err) => {
        if (err) {
          console.error(`[MQTT PUB:Raw] Failed to publish to ${topic}`, err);
        } else {
          // console.log(`[MQTT PUB:Raw] Published to ${topic}:`, message);
        }
      });
    } else {
      console.warn(
        `[MQTT PUB:Raw] MQTT client not connected, message not sent`,
      );
    }
  }
}
