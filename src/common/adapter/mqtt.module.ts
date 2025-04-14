import { Module } from '@nestjs/common';
import { MqttSubscriber } from './mqtt.subscriber';
import { MqttPublisher } from './mqtt.publisher.service';
import { CacheModule } from '../utils/cache/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [MqttSubscriber],
  providers: [MqttPublisher],
  exports: [MqttPublisher],
})
export class MqttModule {}
