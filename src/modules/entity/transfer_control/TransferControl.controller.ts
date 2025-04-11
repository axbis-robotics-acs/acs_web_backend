import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransferControlService } from './TransferControl.service';
import { TransferControl } from './TransferControl.entity';
import { ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/common/utils/exceptions/base.exception';
import { getFormattedTimestampTID } from 'src/common/utils/data-format';

@ApiTags('transfercontrol')
@Controller('transfercontrol')
export class TransferControlController {
  constructor(
    private readonly transfercontrolService: TransferControlService,
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

      console.log(transferControl);
      return this.transfercontrolService.create(transferControl);
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while creating transfer control',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  @Get('search')
  async searchTasks(@Query() query: any): Promise<any[]> {
    try {
      return this.transfercontrolService.searchTasks(query);
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while searching tasks',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }
}
