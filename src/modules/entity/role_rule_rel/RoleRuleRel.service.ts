import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRuleRel } from './RoleRuleRel.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class RoleRuleRelService {
  constructor(
    @InjectRepository(RoleRuleRel)
    private readonly rolerulerelRepository: Repository<RoleRuleRel>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<RoleRuleRel[]> {
    return this.queryRegistryService.select<RoleRuleRel>(RoleRuleRel, {});
  }

  async selectOne<K extends keyof RoleRuleRel>(
    where: Pick<RoleRuleRel, K>,
  ): Promise<RoleRuleRel | null> {
    const results = await this.queryRegistryService.select<RoleRuleRel>(
      RoleRuleRel,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(roleRuleRelData: RoleRuleRel): Promise<RoleRuleRel> {
    return this.queryRegistryService.create<RoleRuleRel>(
      RoleRuleRel,
      roleRuleRelData,
      true,
    );
  }

  async update<K extends keyof RoleRuleRel>(
    where: Pick<RoleRuleRel, K>,
    roleRuleRelData: RoleRuleRel,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<RoleRuleRel>(
      RoleRuleRel,
      where,
      roleRuleRelData,
      true,
    );
  }

  async delete<K extends keyof RoleRuleRel>(
    where: Pick<RoleRuleRel, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<RoleRuleRel>(
      RoleRuleRel,
      where,
      true,
    );
  }
}
