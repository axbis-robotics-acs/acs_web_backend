import { Module } from '@nestjs/common';
import { LocalCacheModule } from '../../cache/cache.module';
import { MqttPublishService } from './mqtt.publisher.service';
import { MqttSecuritySubService } from './mqtt.security.subscribe.service';
import { MqttInternalSubService } from './mqtt.internal.subscribe.service';
import { MqttClientService } from './mqtt.client.service';
import { MqttController } from './mqtt.controller';
import { ElasticModule } from '../elk/elastic.module';
import { WebSocketModule } from '../websocket/socket.module';
import { ResponseModule } from 'src/common/handler/response.module';

@Module({
  imports: [LocalCacheModule, ResponseModule, ElasticModule, WebSocketModule],
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
