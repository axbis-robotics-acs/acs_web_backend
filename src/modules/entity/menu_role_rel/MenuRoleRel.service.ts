import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuRoleRel } from './MenuRoleRel.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class MenuRoleRelService {
  constructor(
    @InjectRepository(MenuRoleRel)
    private readonly menurolerelRepository: Repository<MenuRoleRel>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<MenuRoleRel[]> {
    return this.queryRegistryService.select<MenuRoleRel>(MenuRoleRel, {});
  }

  async selectOne<K extends keyof MenuRoleRel>(
    where: Pick<MenuRoleRel, K>,
  ): Promise<MenuRoleRel | null> {
    const results = await this.queryRegistryService.select<MenuRoleRel>(
      MenuRoleRel,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(menuRoleRelData: MenuRoleRel): Promise<MenuRoleRel> {
    return this.queryRegistryService.create<MenuRoleRel>(
      MenuRoleRel,
      menuRoleRelData,
      true,
    );
  }

  async update<K extends keyof MenuRoleRel>(
    where: Pick<MenuRoleRel, K>,
    menuRoleRelData: MenuRoleRel,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<MenuRoleRel>(
      MenuRoleRel,
      where,
      menuRoleRelData,
      true,
    );
  }

  async delete<K extends keyof MenuRoleRel>(
    where: Pick<MenuRoleRel, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<MenuRoleRel>(
      MenuRoleRel,
      where,
      true,
    );
  }

  async getMenuByRole(
    role_cd: string,
    site_cd: string,
  ): Promise<MenuRoleRel[]> {
    return this.queryRegistryService.select<MenuRoleRel>(MenuRoleRel, {
      role_cd: role_cd,
      site_cd: site_cd,
      usable_fl: 1,
    });
  }
}
