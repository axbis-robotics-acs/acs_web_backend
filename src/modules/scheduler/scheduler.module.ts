// src/modules/status/status.module.ts
import { Module } from '@nestjs/common';
import { HeartbeatScheduler } from './heartbeat.scheduler';
import { CacheModule } from 'src/common/utils/cache/cache.module';
import { MqttModule } from 'src/common/adapter/mqtt.module';
import { TransferStateScheduler } from './transferstate.scheduler';
import { TransferControlModule } from '../entity/transfer_control/TransferControl.module';

@Module({
  imports: [CacheModule, MqttModule, TransferControlModule],
  controllers: [],
  providers: [HeartbeatScheduler, TransferStateScheduler],
})
export class CommonScheduleModule {}
