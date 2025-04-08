import { Controller, Get, Param } from '@nestjs/common';
import { SiteService } from './Site.service';
import { Site } from './Site.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('site')
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get()
  async findAll(): Promise<Site[]> {
    return this.siteService.findAll();
  }

}
