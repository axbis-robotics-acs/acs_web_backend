import { Controller, Get, Param } from '@nestjs/common';
import { RobotService } from './Robot.service';
import { Robot } from './Robot.entity';

@Controller('robot')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Get()
  async findAll(): Promise<Robot[]> {
    return this.robotService.findAll();
  }

}
