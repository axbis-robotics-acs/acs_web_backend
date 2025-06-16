import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from './Alarm.entity';
import { AlarmController } from './Alarm.controller';
import { AlarmService } from './Alarm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm])],
  providers: [AlarmService],
  controllers: [AlarmController],
})
export class AlarmModule {}
