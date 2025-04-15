import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { TransferControlService } from '../entity/transfer_control/TransferControl.service';
import { TransferStateCacheService } from 'src/common/utils/cache/transfercontrol.cache.service';

@Injectable()
export class TransferStateScheduler {
  private readonly logger = new Logger(TransferStateScheduler.name);

  constructor(
    private readonly transferCache: TransferStateCacheService,
    private readonly transferControlService: TransferControlService,
  ) {}

  @Interval(3000) // ✅ 3초마다 실행
  async readTransferState() {
    for (const [transfer_id, cached] of this.transferCache.entries()) {
      this.logger.log(
        `Transfer ${transfer_id}의 현재 상태 확인: ${cached.transfer_st}`,
      );
      const latest = await this.transferControlService.selectOne({
        transfer_id: transfer_id,
      });

      if (!latest) {
        this.transferCache.remove(transfer_id);
        this.logger.log(`Removed invalid transfer_id: ${transfer_id}`);
        continue;
      }

      if (cached.transfer_st !== latest.transfer_st) {
        this.transferCache.add(transfer_id, {
          transfer_st: latest.transfer_st,
        });

        this.logger.log(
          `Transfer ${transfer_id} 상태 변경: ${cached.transfer_st} → ${latest.transfer_st}`,
        );

        // Send the status update to the gateway
        //   this.gateway.sendTransferStatusUpdate({
        //     transfer_id,
        //     prev_status: cached.transfer_st,
        //     new_status: latest.transfer_st,
        //   });

        if (latest.transfer_st === 'COMPLETE') {
          this.transferCache.remove(transfer_id);
          this.logger.log(
            `Transfer ${transfer_id} 작업 완료. 캐시에서 제거됨.`,
          );
        }
      }
    }
  }
}
