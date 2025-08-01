import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentHistService } from './EquipmentHist.service';
import { EquipmentHist } from './EquipmentHist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('equipmenthist')
@Controller('equipmenthist')
export class EquipmentHistController {
  constructor(private readonly equipmenthistService: EquipmentHistService) {}

  @Get()
  async findAll(): Promise<EquipmentHist[]> {
    return this.equipmenthistService.findAll();
  }

}
