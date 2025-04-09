import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransferControlService } from './TransferControl.service';
import { TransferControl } from './TransferControl.entity';
import { ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/common/utils/exceptions/base.exception';

@ApiTags('transfercontrol')
@Controller('transfercontrol')
export class TransferControlController {
  constructor(private readonly transfercontrolService: TransferControlService) {}

  @Get()
  async findAll(): Promise<TransferControl[]> {
    return this.transfercontrolService.findAll();
  }

  @Post()
  async create(@Body() transferControl: TransferControl): Promise<TransferControl> {
    return this.transfercontrolService.create(transferControl);
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
