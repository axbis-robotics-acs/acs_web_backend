import { Controller, Get, Param } from '@nestjs/common';
import { RobotService } from './Robot.service';
import { Robot } from './Robot.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('robot')
@Controller('robot')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Get()
  async findAll(): Promise<Robot[]> {
    return this.robotService.findAll();
  }

  @Get('monitoring/count')
  async findMonitoringCount(): Promise<number> {
    return this.robotService.findRobotMonitoringSummary();
  }
}
