import { Controller, Get, Post } from '@nestjs/common';
import { LangService } from './Lang.service';
import { Lang } from './Lang.entity';

@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Post('getAll')
  async getAll() {
    return this.langService.findAll();
  }

  @Post('save')
  async save() {
    //Todo: Implement save method
    return this.langService.findAll();
  }
}
