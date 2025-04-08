import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentHist } from './EquipmentHist.entity';
import { EquipmentHistService } from './EquipmentHist.service';
import { EquipmentHistController } from './EquipmentHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentHist])],
  providers: [EquipmentHistService],
  controllers: [EquipmentHistController],
})
export class EquipmentHistModule {}
