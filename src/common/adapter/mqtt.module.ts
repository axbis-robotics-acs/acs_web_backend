import { Module } from '@nestjs/common';
import { MqttSubscriber } from './mqtt.subscriber';
import { MqttPublisher } from './mqtt.publisher.service';
import { QueryRegistry } from '../utils/query/query-registry.service';
import { CacheModule } from '../utils/cache/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [MqttSubscriber],
  providers: [MqttPublisher, QueryRegistry],
  exports: [MqttPublisher],
})
export class MqttModule {}
