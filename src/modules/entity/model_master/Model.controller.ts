import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModelService } from './Model.service';
import { Model } from './Model.entity';

@ApiTags('model')
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) { }

  @Get()
  async findAll(@Req() req: any): Promise<Model[]> {
    const user = req.session.user;
    return this.modelService.findAll(user.site_cd);
  }
}
