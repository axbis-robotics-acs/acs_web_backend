import { Controller, Get, Param, Req } from '@nestjs/common';
import { MapService } from './Map.service';
import { Map } from './Map.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('map')
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async findAll(@Req() req: any): Promise<Map[]> {
    const user = req.session.user;
    return this.mapService.findAll(user.site_cd);
  }

}
