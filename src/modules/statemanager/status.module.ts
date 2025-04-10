// src/modules/status/status.module.ts
import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusUpdaterService } from './status-update.service';
import { StatusStoreService } from './status-store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferControl } from '../entity/transfer_control/TransferControl.entity';
import { StatusEventService } from './status.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([TransferControl])],
  controllers: [StatusController],
  providers: [StatusUpdaterService, StatusStoreService, StatusEventService],
  exports: [StatusStoreService],
})
export class StatusModule {}
