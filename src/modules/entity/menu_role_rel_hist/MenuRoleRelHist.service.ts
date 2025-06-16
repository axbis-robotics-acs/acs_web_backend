import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { MenuRoleRelHist } from './MenuRoleRelHist.entity';

@Injectable()
export class MenuRoleRelHistService {
  constructor(
    @InjectRepository(MenuRoleRelHist)
    private readonly menurolerelHistRepository: Repository<MenuRoleRelHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<MenuRoleRelHist[]> {
    return this.queryRegistryService.select<MenuRoleRelHist>(
      MenuRoleRelHist,
      {},
    );
  }

  async selectOne<K extends keyof MenuRoleRelHist>(
    where: Pick<MenuRoleRelHist, K>,
  ): Promise<MenuRoleRelHist | null> {
    const results = await this.queryRegistryService.select<MenuRoleRelHist>(
      MenuRoleRelHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(menuRoleRelData: MenuRoleRelHist): Promise<MenuRoleRelHist> {
    return this.queryRegistryService.create<MenuRoleRelHist>(
      MenuRoleRelHist,
      menuRoleRelData,
      true,
    );
  }

  async update<K extends keyof MenuRoleRelHist>(
    where: Pick<MenuRoleRelHist, K>,
    menuRoleRelData: MenuRoleRelHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<MenuRoleRelHist>(
      MenuRoleRelHist,
      where,
      menuRoleRelData,
      true,
    );
  }

  async delete<K extends keyof MenuRoleRelHist>(
    where: Pick<MenuRoleRelHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<MenuRoleRelHist>(
      MenuRoleRelHist,
      where,
      true,
    );
  }

  async getMenuByRole(
    role_cd: string,
    site_cd: string,
  ): Promise<MenuRoleRelHist[]> {
    return this.queryRegistryService.select<MenuRoleRelHist>(MenuRoleRelHist, {
      role_cd: role_cd,
      site_cd: site_cd,
      usable_fl: 1,
    });
  }
}
