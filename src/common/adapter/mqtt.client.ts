// mqtt.client.ts
import { connect, MqttClient } from 'mqtt';
import {
  mqttsUrl,
  mqttUrl,
  mqttOmronPublisherOptions,
  mqttInternalPublisherConfig,
} from './mqtt.config';

export const mqttSecurityClient: MqttClient = connect(
  mqttsUrl,
  mqttOmronPublisherOptions,
);
export const mqttClient: MqttClient = connect(
  mqttUrl,
  mqttInternalPublisherConfig('Publisher_Internal'),
);
