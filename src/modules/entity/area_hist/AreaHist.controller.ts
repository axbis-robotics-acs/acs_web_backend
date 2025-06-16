import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AreaHistService } from './AreaHist.service';
import { AreaHist } from './AreaHist.entity';

@ApiTags('areahist')
@Controller('areahist')
export class AreaHistController {
  constructor(private readonly areaHistService: AreaHistService) {}

  @Get()
  async findAll(): Promise<AreaHist[]> {
    return this.areaHistService.findAll();
  }
}
