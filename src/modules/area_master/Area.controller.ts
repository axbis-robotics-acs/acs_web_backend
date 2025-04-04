import { Controller, Get, Param } from '@nestjs/common';
import { AreaService } from './Area.service';
import { Area } from './Area.entity';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  async findAll(): Promise<Area[]> {
    return this.areaService.findAll();
  }

}
