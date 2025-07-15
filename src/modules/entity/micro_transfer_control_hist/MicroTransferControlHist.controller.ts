import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/common/exceptions/base.exception';
import { getFormattedTimestampTID } from 'src/common/utils/date.format';
import { TransferStateCacheService } from 'src/common/cache/transfercontrol.cache.service';
import { MicroTransferControlHistService } from './MicroTransferControlHist.service';
import { MicroTransferControlHist } from './MicroTransferControlHist.entity';

@ApiTags('microtransfercontrol')
@Controller('microtransfercontrol')
export class MicroTransferControlHistHistController {
  constructor(
    private readonly MicroTransferControlHistService: MicroTransferControlHistService,
    private readonly microtransferCache: TransferStateCacheService,
  ) {}

  @Get()
  async findAll(): Promise<MicroTransferControlHist[]> {
    return this.MicroTransferControlHistService.findAll();
  }

  @Post()
  async create(
    @Body() MicroTransferControlHist: MicroTransferControlHist,
  ): Promise<MicroTransferControlHist> {
      for (const key in MicroTransferControlHist) {
        if (
          MicroTransferControlHist[key] === undefined ||
          MicroTransferControlHist[key] === ''
        ) {
          MicroTransferControlHist[key] = null;
        }
      }

      MicroTransferControlHist.micro_transfer_id =
        MicroTransferControlHist.micro_transfer_id ||
        getFormattedTimestampTID();

      MicroTransferControlHist.priority_no = parseInt(
        MicroTransferControlHist.priority_no.toString(),
        10,
      );

      const createresult = await this.MicroTransferControlHistService.create(
        MicroTransferControlHist,
      );
      const result = await this.MicroTransferControlHistService.selectOne({
        transfer_id: MicroTransferControlHist.transfer_id,
      });

      console.log('result', result);

      if (result) {
        this.microtransferCache.add(MicroTransferControlHist.transfer_id, {
          transfer_status_tx: result.micro_transfer_st,
        });
      }

      return createresult;
    }
  }

  @Post('search')
  async searchTasks(
    @Body() transferDto: { transfer_st: string; site_cd: string },
  ): Promise<any[]> {
      return this.MicroTransferControlHistService.searchTasks(
        transferDto.transfer_st,
        transferDto.site_cd,
      );
  }
}
