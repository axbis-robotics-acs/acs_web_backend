// src/modules/status/status.module.ts
import { Module } from '@nestjs/common';
import { HeartbeatScheduler } from './heartbeat.scheduler';
import { CacheModule } from 'src/common/utils/cache/cache.module';
import { MqttModule } from 'src/common/adapter/mqtt.module';

@Module({
  imports: [CacheModule, MqttModule],
  controllers: [],
  providers: [HeartbeatScheduler],
  exports: [HeartbeatScheduler],
})
export class CommonScheduleModule {}
