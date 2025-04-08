import { Controller, Get, Param } from '@nestjs/common';
import { PortHistService } from './PortHist.service';
import { PortHist } from './PortHist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('porthist')
@Controller('porthist')
export class PortHistController {
  constructor(private readonly porthistService: PortHistService) {}

  @Get()
  async findAll(): Promise<PortHist[]> {
    return this.porthistService.findAll();
  }

}
