import { Controller, Get, Param } from '@nestjs/common';
import { PortService } from './Port.service';
import { Port } from './Port.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('port')
@Controller('port')
export class PortController {
  constructor(private readonly portService: PortService) {}

  @Get()
  async findAll(): Promise<Port[]> {
    return this.portService.findAll();
  }

}
