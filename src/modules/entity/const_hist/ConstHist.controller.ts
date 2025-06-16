import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConstHistService } from './ConstHist.service';
import { ConstHist } from './ConstHist.entity';

@ApiTags('consthist')
@Controller('consthist')
export class ConstHistController {
  constructor(private readonly constHistService: ConstHistService) {}

  @Get()
  async findAll(): Promise<ConstHist[]> {
    return this.constHistService.findAll();
  }
}
