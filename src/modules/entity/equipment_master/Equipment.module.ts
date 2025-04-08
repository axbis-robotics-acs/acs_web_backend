import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './Equipment.entity';
import { EquipmentService } from './Equipment.service';
import { EquipmentController } from './Equipment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment])],
  providers: [EquipmentService],
  controllers: [EquipmentController],
})
export class EquipmentModule {}
