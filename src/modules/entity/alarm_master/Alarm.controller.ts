import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlarmService } from './Alarm.service';
import { Alarm } from './Alarm.entity';

@ApiTags('alarm')
@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post(':id')
  async findByAlarmId(AlarmId: string): Promise<Alarm | null> {
    return this.alarmService.findById(AlarmId);
  }
}
