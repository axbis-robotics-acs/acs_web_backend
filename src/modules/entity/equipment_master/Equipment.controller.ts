import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentService } from './Equipment.service';
import { Equipment } from './Equipment.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  async findAll(): Promise<Equipment[]> {
    return this.equipmentService.findAll();
  }

}
