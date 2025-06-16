import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LangHistService } from './LangHist.service';
import { LangHist } from './LangHist.entity';

@ApiTags('langhist')
@Controller('langhist')
export class LangHistController {
  constructor(private readonly langHistService: LangHistService) {}

  @Get()
  async findAll(): Promise<LangHist[]> {
    return this.langHistService.findAll();
  }
}
