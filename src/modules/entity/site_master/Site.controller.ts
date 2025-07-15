import { Controller, Get, Param, Post } from '@nestjs/common';
import { SiteService } from './Site.service';
import { Site } from './Site.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiDefault } from 'src/common/decorators/swggerAPIDecorators';

@ApiTags('site')
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post('login_getAll')
  @ApiDefault({
    summary: '다국어 조회',
    params: [],
    successResponseDto: Site,
  })
  async getAll() {
    return this.siteService.findAll();
  }
}
