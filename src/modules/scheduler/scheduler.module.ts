// src/modules/status/status.module.ts
import { Module } from '@nestjs/common';
import { HeartbeatScheduler } from './heartbeat.scheduler';
import { CacheModule } from 'src/common/cache/cache.module';
import { MqttModule } from 'src/common/adapter/mqtt/mqtt.module';
import { TransferStateScheduler } from './transferstate.scheduler';
import { TransferControlModule } from '../entity/transfer_control/TransferControl.module';
import { ElasticModule } from 'src/common/adapter/elk/elastic.module';
import { SystemMonitorScheduler } from './system.monitor.scheduler';

@Module({
  imports: [CacheModule, MqttModule, TransferControlModule, ElasticModule],
  controllers: [],
  providers: [
    HeartbeatScheduler,
    TransferStateScheduler,
    SystemMonitorScheduler,
  ],
})
export class CommonScheduleModule {}
