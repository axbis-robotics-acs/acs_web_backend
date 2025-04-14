import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './Rule.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Rule[]> {
    return this.queryRegistryService.select<Rule>(Rule, {});
  }

  async selectOne<K extends keyof Rule>(
    where: Pick<Rule, K>,
  ): Promise<Rule | null> {
    const results = await this.queryRegistryService.select<Rule>(Rule, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(ruleData: Rule): Promise<Rule> {
    return this.queryRegistryService.create<Rule>(Rule, ruleData, true);
  }

  async update<K extends keyof Rule>(
    where: Pick<Rule, K>,
    ruleData: Rule,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Rule>(Rule, where, ruleData, true);
  }

  async delete<K extends keyof Rule>(
    where: Pick<Rule, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Rule>(Rule, where, true);
  }
}
