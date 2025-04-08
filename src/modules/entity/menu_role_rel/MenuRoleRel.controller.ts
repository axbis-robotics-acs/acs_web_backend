import { Controller, Get, Post, Body } from '@nestjs/common';
import { MenuRoleRelService } from './MenuRoleRel.service';
import { MenuRoleRel } from './MenuRoleRel.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('menurolerel')
@Controller('menurolerel')
export class MenuRoleRelController {
  constructor(private readonly menurolerelService: MenuRoleRelService) {}

  @Get()
  async findAll(): Promise<MenuRoleRel[]> {
    return this.menurolerelService.findAll();
  }

  @Post('getMenuByRole')
  async getMenuByRole(
    @Body('role_cd') role_cd: string,
    @Body('site_cd') site_cd: string,
  ) {
    return this.menurolerelService.getMenuByRole(role_cd, site_cd);
  }
}
