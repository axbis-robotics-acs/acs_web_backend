import { Module } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { MqttPublishService } from './mqtt.publisher.service';
import { MqttSecuritySubService } from './mqtt.security.subscribe.service';
import { MqttInternalSubService } from './mqtt.internal.subscribe.service';
import { MqttClientService } from './mqtt.client.service';
import { MqttController } from './mqtt.controller';
import { HandlerModule } from 'src/common/handler/handler.module';
import { ElasticModule } from '../elk/elastic.module';

@Module({
  imports: [CacheModule, HandlerModule, ElasticModule],
  providers: [
    MqttSecuritySubService,
    MqttInternalSubService,
    MqttClientService,
    MqttPublishService,
  ],
  controllers: [MqttController],
  exports: [MqttPublishService],
})
export class MqttModule {}
