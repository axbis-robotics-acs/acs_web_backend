import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Menu } from './Menu.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

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
