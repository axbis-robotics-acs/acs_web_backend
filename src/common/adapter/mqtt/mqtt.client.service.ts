// mqtt.client.service.ts
import mqtt, { connect, MqttClient } from 'mqtt';
import {
  mqttsUrl,
  mqttUrl,
  mqttOmronPublisherOptions,
  mqttInternalPublisherConfig,
  mqttOmronSubscribeOptions,
  mqttInternalSubscribeConfig,
} from './mqtt.config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MqttSecuritySubService } from './mqtt.security.subscribe.service';
import { MqttInternalSubService } from './mqtt.internal.subscribe.service';

@Injectable()
export class MqttClientService implements OnModuleInit {
  private internalPublisherClient: MqttClient;
  private internalSubscriberClient: MqttClient;
  private omronPublisherClient: MqttClient;
  private omronSubscriberClient: MqttClient;

  constructor(
    private readonly internalSubService: MqttInternalSubService,
    private readonly omronSubService: MqttSecuritySubService,
  ) {}

  onModuleInit() {
    this.connectInternalPublisher();
    this.connectInternalSubscriber();
    this.connectOmronPublisher();
    this.connectOmronSubscriber();
  }

  private connectInternalPublisher() {
    this.internalPublisherClient = connect(
      mqttUrl,
      mqttInternalPublisherConfig('internal_pub'),
    );
    this.setupEvents(this.internalPublisherClient, 'internal-pub');
  }

  private connectInternalSubscriber() {
    this.internalSubscriberClient = connect(
      mqttUrl,
      mqttInternalSubscribeConfig('internal_sub'),
    );
    this.setupEvents(this.internalSubscriberClient, 'internal-sub');
    this.internalSubscriberClient.on('message', (topic, payload) => {
      // TODO: 메시지 처리
      this.internalSubService.handleMessage(topic, payload);
    });
    const topics = [
      'web/response',
      'web/backend/connection/response',
      'web/backend/event/#',
    ];
    this.internalSubscriberClient.subscribe(topics);
  }

  private connectOmronPublisher() {
    this.omronPublisherClient = connect(mqttsUrl, mqttOmronPublisherOptions);
    this.setupEvents(this.omronPublisherClient, 'omron-pub');
  }

  private connectOmronSubscriber() {
    this.omronSubscriberClient = connect(mqttsUrl, mqttOmronSubscribeOptions);
    this.setupEvents(this.omronSubscriberClient, 'omron-sub');
    this.omronSubscriberClient.on('message', (topic, payload) => {
      // TODO: 메시지 처리
      this.omronSubService.handleMessage(topic, payload);
    });
    this.omronSubscriberClient.subscribe('itk/#');
  }

  private setupEvents(client: MqttClient, label: string) {
    client.on('connect', () => console.log(`[MQTT:${label}] ✅ connected`));
    client.on('reconnect', () =>
      console.warn(`[MQTT:${label}] reconnecting...`),
    );
    client.on('error', (err) =>
      console.error(`[MQTT:${label}] error:`, err.message),
    );
    client.on('close', () => console.warn(`[MQTT:${label}] disconnected`));
  }

  // 외부에서 발행용 메서드 제공
  /**
   * 
  options?:
    {
      qos?: 0 | 1 | 2;
      retain?: boolean;
      dup?: boolean;
    }
   */
  publishInternal(
    topic: string,
    message: string,
    options?: mqtt.IClientPublishOptions,
  ) {
    this.internalPublisherClient?.publish(topic, message, options);
  }

  publishOmron(
    topic: string,
    message: string,
    options?: mqtt.IClientPublishOptions,
  ) {
    this.omronPublisherClient?.publish(topic, message, options);
  }
}
