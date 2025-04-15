import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransferControlService } from './TransferControl.service';
import { TransferControl } from './TransferControl.entity';
import { ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/common/utils/exceptions/base.exception';
import { getFormattedTimestampTID } from 'src/common/utils/data-format';
import { TransferStateCacheService } from 'src/common/utils/cache/transfercontrol.cache.service';

@ApiTags('transfercontrol')
@Controller('transfercontrol')
export class TransferControlController {
  constructor(
    private readonly transfercontrolService: TransferControlService,
    private readonly transferCache: TransferStateCacheService,
  ) {}

  @Get()
  async findAll(): Promise<TransferControl[]> {
    return this.transfercontrolService.findAll();
  }

  @Post()
  async create(
    @Body() transferControl: TransferControl,
  ): Promise<TransferControl> {
    try {
      for (const key in transferControl) {
        if (transferControl[key] === undefined || transferControl[key] === '') {
          transferControl[key] = null;
        }
      }

      transferControl.transfer_id =
        transferControl.transfer_id || getFormattedTimestampTID();

      transferControl.priority_no = parseInt(
        transferControl.priority_no.toString(),
        10,
      );

      const createresult =
        await this.transfercontrolService.create(transferControl);
      const result = await this.transfercontrolService.selectOne({
        transfer_id: transferControl.transfer_id,
      });

      console.log('result', result);

      if (result) {
        this.transferCache.add(transferControl.transfer_id, {
          transfer_st: result.transfer_st,
        });
      }

      return createresult;
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while creating transfer control',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  @Post('search')
  async searchTasks(
    @Body() transferDto: { transfer_st: string; site_cd: string },
  ): Promise<any[]> {
    try {
      return this.transfercontrolService.searchTasks(
        transferDto.transfer_st,
        transferDto.site_cd,
      );
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while searching tasks',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }
}
