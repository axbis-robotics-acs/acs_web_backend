import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Menu } from './Menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async findMenuId(menu_cd: string[], site_cd: string) {
    const res = this.menuRepository.find({
      where: {
        menu_cd: In(menu_cd), // ✅ 배열 처리
        site_cd,
        usable_fl: 1,
      },
      order: {
        menu_seq: 'ASC',
      },
    });

    return res;
  }

  async findSubMenuId(menu_cd: string, site_cd: string) {
    const res = this.menuRepository.find({
      where: {
        parent_id: menu_cd, // ✅ 배열 처리
        site_cd,
        usable_fl: 1, // 활성화된 메뉴만 가져오기
      },
      order: {
        menu_seq: 'ASC',
      },
    });

    return res;
  }
}
