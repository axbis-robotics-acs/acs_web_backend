import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuRoleRelHistService } from './MenuRoleRelHist.service';
import { MenuRoleRelHist } from './MenuRoleRelHist.entity';

@ApiTags('menurolerelHist')
@Controller('menurolerelHist')
export class MenuRoleRelHistController {
  constructor(
    private readonly menurolerelHistService: MenuRoleRelHistService,
  ) {}

  @Get()
  async findAll(): Promise<MenuRoleRelHist[]> {
    return this.menurolerelHistService.findAll();
  }
}
