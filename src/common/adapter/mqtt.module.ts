import { Module } from '@nestjs/common';
import { MqttSubscriber } from './mqtt.subscriber';
import { MqttPublisher } from './mqtt.publisher.service';

@Module({
  controllers: [MqttSubscriber],
  providers: [MqttPublisher],
  exports: [MqttPublisher],
})
export class MqttModule {}
