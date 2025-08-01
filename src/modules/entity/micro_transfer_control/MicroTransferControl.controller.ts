import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/common/exceptions/base.exception';
import { getFormattedTimestampTID } from 'src/common/utils/date.format';
import { TransferStateCacheService } from 'src/common/cache/transfercontrol.cache.service';
import { MicroTransferControlService } from './MicroTransferControl.service';
import { MicroTransferControl } from './MicroTransferControl.entity';

@ApiTags('microtransfercontrol')
@Controller('microtransfercontrol')
export class MicroTransferControlController {
  constructor(
    private readonly microtransfercontrolService: MicroTransferControlService,
    private readonly microtransferCache: TransferStateCacheService,
  ) {}

  @Get()
  async findAll(): Promise<MicroTransferControl[]> {
    return this.microtransfercontrolService.findAll();
  }

  @Post()
  async create(
    @Body() microTransferControl: MicroTransferControl,
  ): Promise<MicroTransferControl> {
    for (const key in microTransferControl) {
      if (
        microTransferControl[key] === undefined ||
        microTransferControl[key] === ''
      ) {
        microTransferControl[key] = null;
      }
    }

    microTransferControl.micro_transfer_id =
      microTransferControl.micro_transfer_id || getFormattedTimestampTID();

    microTransferControl.priority_no = parseInt(
      microTransferControl.priority_no.toString(),
      10,
    );

    const createresult =
      await this.microtransfercontrolService.create(microTransferControl);
    const result = await this.microtransfercontrolService.selectOne({
      transfer_id: microTransferControl.transfer_id,
    });

    console.log('result', result);

    if (result) {
      this.microtransferCache.add(microTransferControl.transfer_id, {
        transfer_status_tx: result.micro_transfer_st,
      });
    }

    return createresult;
  }

  @Post('search')
  async searchTasks(
    @Body() transferDto: { transfer_st: string; site_cd: string },
  ): Promise<any[]> {
    return this.microtransfercontrolService.searchTasks(
      transferDto.transfer_st,
      transferDto.site_cd,
    );
  }
}
