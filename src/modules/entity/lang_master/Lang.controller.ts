import { Controller, Get, Post } from '@nestjs/common';
import { LangService } from './Lang.service';
import { Lang } from './Lang.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiDefault } from 'src/common/decorators/swggerAPIDecorators';

@ApiTags('lang')
@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Post('getAll')
  @ApiDefault({
    summary: '다국어 조회',
    params: [],
    successResponseDto: Lang,
  })
  async getAll() {
    return this.langService.findAll();
  }

  @Post('save')
  async save() {
    //Todo: Implement save method
    return this.langService.findAll();
  }
}
