import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferControlHist } from './TransferControlHist.entity';
import { TransferControlHistService } from './TransferControlHist.service';
import { TransferControlHistController } from './TransferControlHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransferControlHist])],
  providers: [TransferControlHistService],
  controllers: [TransferControlHistController],
})
export class TransferControlHistModule {}
