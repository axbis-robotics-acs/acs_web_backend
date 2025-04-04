import { Controller, Get, Param } from '@nestjs/common';
import { MapService } from './Map.service';
import { Map } from './Map.entity';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async findAll(): Promise<Map[]> {
    return this.mapService.findAll();
  }

}
