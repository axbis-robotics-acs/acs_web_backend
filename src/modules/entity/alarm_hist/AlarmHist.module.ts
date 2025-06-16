import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmHist } from './AlarmHist.entity';
import { AlarmHistService } from './AlarmHist.service';
import { AlarmHistController } from './AlarmHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmHist])],
  providers: [AlarmHistService],
  controllers: [AlarmHistController],
})
export class AlarmHistModule {}
