import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlarmHistService } from './AlarmHist.service';
import { AlarmHist } from './AlarmHist.entity';

@ApiTags('alarmhist')
@Controller('alarmhist')
export class AlarmHistController {
  constructor(private readonly alarmHistService: AlarmHistService) {}

  @Get()
  async findAll(): Promise<AlarmHist[]> {
    return this.alarmHistService.findAll();
  }
}
