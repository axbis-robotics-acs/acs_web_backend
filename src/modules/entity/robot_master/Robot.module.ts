import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robot } from './Robot.entity';
import { RobotService } from './Robot.service';
import { RobotController } from './Robot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Robot])],
  providers: [RobotService],
  controllers: [RobotController],
})
export class RobotModule {}
