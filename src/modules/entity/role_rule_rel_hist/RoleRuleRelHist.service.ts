import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { RoleRuleRelHist } from './RoleRuleRelHist.entity';

@Injectable()
export class RoleRuleRelHistService {
  constructor(
    @InjectRepository(RoleRuleRelHist)
    private readonly rolerulerelRepository: Repository<RoleRuleRelHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<RoleRuleRelHist[]> {
    return this.queryRegistryService.select<RoleRuleRelHist>(
      RoleRuleRelHist,
      {},
    );
  }

  async selectOne<K extends keyof RoleRuleRelHist>(
    where: Pick<RoleRuleRelHist, K>,
  ): Promise<RoleRuleRelHist | null> {
    const results = await this.queryRegistryService.select<RoleRuleRelHist>(
      RoleRuleRelHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(roleRuleRelData: RoleRuleRelHist): Promise<RoleRuleRelHist> {
    return this.queryRegistryService.create<RoleRuleRelHist>(
      RoleRuleRelHist,
      roleRuleRelData,
      true,
    );
  }

  async update<K extends keyof RoleRuleRelHist>(
    where: Pick<RoleRuleRelHist, K>,
    roleRuleRelData: RoleRuleRelHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<RoleRuleRelHist>(
      RoleRuleRelHist,
      where,
      roleRuleRelData,
      true,
    );
  }

  async delete<K extends keyof RoleRuleRelHist>(
    where: Pick<RoleRuleRelHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<RoleRuleRelHist>(
      RoleRuleRelHist,
      where,
      true,
    );
  }
}
