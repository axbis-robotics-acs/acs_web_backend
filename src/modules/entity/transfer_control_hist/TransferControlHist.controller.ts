import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransferControlHistService } from './TransferControlHist.service';
import { TransferControlHist } from './TransferControlHist.entity';
import { ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/common/exceptions/base.exception';

@ApiTags('transfercontrolhist')
@Controller('transfercontrolhist')
export class TransferControlHistController {
  constructor(
    private readonly transfercontrolhistService: TransferControlHistService,
  ) {}

  @Get()
  async findAll(): Promise<TransferControlHist[]> {
    return this.transfercontrolhistService.findAll();
  }

  @Get('monitoring/count')
  async findMonitoringCount(): Promise<number> {
    return this.transfercontrolhistService.findMonitoringSummary();
  }

  @Post('search')
  async searchTasks(
    @Body() transferDto: { transfer_status_tx: string; site_cd: string },
  ): Promise<any[]> {
      return this.transfercontrolhistService.searchTasks(
        transferDto.transfer_status_tx,
        transferDto.site_cd,
      );
  }
}
