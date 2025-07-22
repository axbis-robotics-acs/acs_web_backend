import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TransferControlHistService } from './TransferControlHist.service';
import { TransferControlHist } from './TransferControlHist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transfercontrolhist')
@Controller('transfercontrolhist')
export class TransferControlHistController {
  constructor(
    private readonly transfercontrolhistService: TransferControlHistService,
  ) {}

  @Get()
  async findAll(@Req() req:any): Promise<TransferControlHist[]> {
    const user = req.session.user;
    return this.transfercontrolhistService.findTransferBySite(user.site_cd);
  }

  @Get('monitoring/count')
  async findMonitoringCount(@Req() req:any): Promise<number> {
    const user = req.session.user;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return this.transfercontrolhistService.findMonitoringSummary(user.site_cd);
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
