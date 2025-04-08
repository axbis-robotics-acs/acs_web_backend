import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferControl } from './TransferControl.entity';
import { TransferControlService } from './TransferControl.service';
import { TransferControlController } from './TransferControl.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransferControl])],
  providers: [TransferControlService],
  controllers: [TransferControlController],
})
export class TransferControlModule {}
