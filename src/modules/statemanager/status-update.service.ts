// status-updater.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { StatusStoreService } from './status-store.service';
import { TransferControl } from './../entity/transfer_control/TransferControl.entity';
import { StatusEventService } from './status.service';

@Injectable()
export class StatusUpdaterService {
  private readonly logger = new Logger(StatusUpdaterService.name);

  constructor(
    @InjectRepository(TransferControl)
    private readonly transferRepo: Repository<TransferControl>,
    private readonly statusEvent: StatusEventService,
    private readonly statusStore: StatusStoreService,
  ) {}

  // @Interval(1000)
  // async checkTransferStatus() {
  //   console.log('start check transfer status')
  //   const latest = await this.transferRepo.find({
  //       where : {
  //           transfer_st: In(['running', 'ready']),
  //       }
  //   });

  //   for (const row of latest) {
  //     const simplified = {
  //       transfer_id: row.transfer_id,
  //       site_cd: row.site_cd,
  //       transfer_st: row.transfer_st,
  //       assigned_robot_id: row.assigned_robot_id,
  //       activity_tx: row.activity_tx,
  //       last_event_at: row.last_event_at,
  //     };

  //     if (this.statusStore.hasChanged(`${row.transfer_id}-${row.site_cd}`, simplified)) {
  //       this.logger.log(`📡 Changed: ${row.transfer_id} - Pushing to UI`);
  //       this.statusEvent.push(simplified);
  //     }
  //   }
  // }
}
