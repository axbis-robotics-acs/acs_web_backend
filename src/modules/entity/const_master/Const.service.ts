import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Const } from './Const.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class ConstService {
  constructor(
    @InjectRepository(Const)
    private readonly constRepository: Repository<Const>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Const[]> {
    return this.queryRegistryService.select<Const>(Const, {});
  }

  async selectOne<K extends keyof Const>(
    where: Pick<Const, K>,
  ): Promise<Const | null> {
    const results = await this.queryRegistryService.select<Const>(Const, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(constData: Const): Promise<Const> {
    return this.queryRegistryService.create<Const>(Const, constData, true);
  }

  async update<K extends keyof Const>(
    where: Pick<Const, K>,
    constData: Const,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Const>(
      Const,
      where,
      constData,
      true,
    );
  }

  async delete<K extends keyof Const>(
    where: Pick<Const, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Const>(Const, where, true);
  }

  async getValueByCode(code: string, site_cd: string): Promise<string | null> {
    const result = await this.selectOne({
      constant_cd: code,
      site_cd: site_cd,
    });
    return result ? result.constant_val : null;
  }
}
