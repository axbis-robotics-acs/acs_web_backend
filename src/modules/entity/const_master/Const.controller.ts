import { Controller, Get, Param } from '@nestjs/common';
import { ConstService } from './Const.service';
import { Const } from './Const.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('const')
@Controller('const')
export class ConstController {
  constructor(private readonly constService: ConstService) {}

  @Get()
  async findAll(): Promise<Const[]> {
    return this.constService.findAll();
  }

}
