import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiteHistService } from './SiteHist.service';
import { SiteHist } from './SiteHist.entity';

@ApiTags('siteHist')
@Controller('siteHist')
export class SiteHistController {
  constructor(private readonly siteHistService: SiteHistService) {}

  @Get()
  async findAll(): Promise<SiteHist[]> {
    return this.siteHistService.findAll();
  }
}
