import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Menu } from './Menu.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { BaseException } from 'src/common/exceptions/base.exception';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly queryRegistryService: QueryRegistry,
  ) { }


  async findBySite_Role(user: any): Promise<Menu[]> {
    try {
      return await this.menuRepository
        .createQueryBuilder('menu')
        .innerJoin(
          'acs_menu_role_rel',
          'rel',
          'menu.menu_cd = rel.menu_cd AND menu.site_cd = rel.site_cd'
        )
        .where('menu.site_cd = :site_cd', { site_cd: user.site_cd })
        .andWhere('rel.role_cd = :role_cd', { role_cd: user.role_cd })
        .andWhere('menu.usable_fl = :usable', { usable: '1' })
        .andWhere('rel.usable_fl = :usable', { usable: '1' })
        .orderBy('menu.menu_depth', 'ASC')
        .addOrderBy('menu.menu_seq', 'ASC')
        .getMany();
    } catch (err) {
      console.error('❌ 메뉴 조회 실패:', err);
      throw new BaseException({
        message: '메뉴 조회 중 오류가 발생했습니다.',
        debugMessage: err?.message,
        statusCode: 500,
      });
    }
  }


  async findAll(): Promise<Menu[]> {
    return this.queryRegistryService.select<Menu>(Menu, {});
  }

  async selectOne<K extends keyof Menu>(
    where: Pick<Menu, K>,
  ): Promise<Menu | null> {
    const results = await this.queryRegistryService.select<Menu>(Menu, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(menuData: Menu): Promise<Menu> {
    return this.queryRegistryService.create<Menu>(Menu, menuData, true);
  }

  async update<K extends keyof Menu>(
    where: Pick<Menu, K>,
    menuData: Menu,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Menu>(Menu, where, menuData, true);
  }

  async delete<K extends keyof Menu>(
    where: Pick<Menu, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Menu>(Menu, where, true);
  }

  async findMenuId(menu_cd: string[], site_cd: string): Promise<Menu[]> {
    return this.queryRegistryService.selectByOrder<Menu>(
      Menu,
      {
        menu_cd: In(menu_cd),
        site_cd: site_cd,
        usable_fl: 1,
      },
      {
        menu_seq: 'ASC',
      },
    );
  }

  async findSubMenuId(menu_cd: string, site_cd: string): Promise<Menu[]> {
    return this.queryRegistryService.selectByOrder<Menu>(
      Menu,
      {
        parent_id: menu_cd,
        site_cd: site_cd,
        usable_fl: 1,
      },
      {
        menu_seq: 'ASC',
      },
    );
  }
}
