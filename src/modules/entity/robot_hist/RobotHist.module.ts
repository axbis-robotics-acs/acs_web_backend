import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotHist } from './RobotHist.entity';
import { RobotHistService } from './RobotHist.service';
import { RobotHistController } from './RobotHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RobotHist])],
  providers: [RobotHistService],
  controllers: [RobotHistController],
})
export class RobotHistModule {}
