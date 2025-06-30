import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModelService } from './Model.service';
import { Model } from './Model.entity';

@ApiTags('model')
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async findAll(): Promise<Model[]> {
    return this.modelService.findAll();
  }
}
