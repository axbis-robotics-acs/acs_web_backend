import { Controller, Get, Param } from '@nestjs/common';
import { RobotHistService } from './RobotHist.service';
import { RobotHist } from './RobotHist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('robothist')
@Controller('robothist')
export class RobotHistController {
  constructor(private readonly robothistService: RobotHistService) {}

  @Get()
  async findAll(): Promise<RobotHist[]> {
    return this.robothistService.findAll();
  }

}
