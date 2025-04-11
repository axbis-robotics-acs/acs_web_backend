import { Controller, Get, Param, Post } from '@nestjs/common';
import { AreaService } from './Area.service';
import { Area } from './Area.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post(':id')
  async findByAreaId(AreaId: string): Promise<Area | null> {
    return this.areaService.findById(AreaId);
  }
}
