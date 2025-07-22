import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { MenuService } from './Menu.service';
import { Menu } from './Menu.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

@Get()
async findAll(@Req() req: any): Promise<Menu[]> {
  const user = req.session?.user;
  const result = await this.menuService.findBySite_Role(user);

  if (!result || result.length === 0) {
    console.log('✅ 반환할 메뉴가 없습니다.'); 
    return []; 
  }
  return result; 
}


  @Post('getMenu')
  async findMenuId(
    @Body('menu_cd') menu_cd: string,
    @Body('site_cd') site_cd: string,
  ) {
    const menuCdArray = menu_cd
      ? menu_cd.split(',').map((item) => item.trim().replace(/^"|"$/g, ''))
      : [];

    const cleanedSiteCd = site_cd.replace(/^"|"$/g, '');

    return this.menuService.findMenuId(menuCdArray, cleanedSiteCd);
  }

  @Post('getSubMenu')
  async findSubMenuId(
    @Body('parent_id') parent_id: string, // ✅ 배열 처리
    @Body('site_cd') site_cd: string,
  ) {
    const cleanedParentId = parent_id.trim().replace(/^"|"$/g, '');
    const cleanedSiteCd = site_cd.replace(/^"|"$/g, '');

    return this.menuService.findSubMenuId(cleanedParentId, cleanedSiteCd);
  }
}
