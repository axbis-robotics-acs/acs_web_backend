// src/common/handler/handler.module.ts
import { Module } from '@nestjs/common';
import { MqttModule } from '../adapter/mqtt/mqtt.module';
import { WriterService } from './writer.service';

@Module({
  imports: [MqttModule],
  providers: [WriterService],
  exports: [WriterService],
})
export class WriterModule {}
