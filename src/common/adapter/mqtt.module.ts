import { Module } from '@nestjs/common';
import { MqttSubscriber } from './mqtt.subscriber';
import { CacheModule } from '../utils/cache/cache.module';
import { MqttService } from './mqtt.service';
import { MqttsecurityService } from './mqtt.security.service';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [CacheModule],
  controllers: [MqttSubscriber, MqttController],
  providers: [MqttService, MqttsecurityService],
  exports: [MqttService, MqttsecurityService],
})
export class MqttModule {}
