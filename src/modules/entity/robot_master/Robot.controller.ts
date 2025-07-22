import { Controller, Get, Param, Req } from '@nestjs/common';
import { RobotService } from './Robot.service';
import { Robot } from './Robot.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('robot')
@Controller('robot')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Get()
  async findAll(@Req() req: any): Promise<Robot[]> {
    const user = req.session.user;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return this.robotService.findRobotBySite(user.site_cd);
  }

  @Get('monitoring/count')
  async findMonitoringCount(@Req() req: any): Promise<number> {
    const user = req.session.user;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return this.robotService.findRobotMonitoringSummary(user.site_cd);
  }
}
