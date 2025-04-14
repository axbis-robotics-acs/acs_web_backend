import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lang } from './Lang.entity';
import { QueryRegistry, UpdateResult, DeleteResult } from '../../../common/utils/query/query-registry.service';

@Injectable()
export class LangService {
  constructor(
    @InjectRepository(Lang)
    private readonly langRepository: Repository<Lang>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Lang[]> {
    return this.queryRegistryService.select<Lang>(Lang, {});
  }

  async selectOne<K extends keyof Lang>(where: Pick<Lang, K>): Promise<Lang | null> {
    const results = await this.queryRegistryService.select<Lang>(Lang, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(langData: Lang): Promise<Lang> {
    return this.queryRegistryService.create<Lang>(Lang, langData, true);
  }

  async update<K extends keyof Lang>(where: Pick<Lang, K>, langData: Lang): Promise<UpdateResult> {
    return this.queryRegistryService.update<Lang>(Lang, where, langData, true);
  }

  async delete<K extends keyof Lang>(where: Pick<Lang, K>): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Lang>(Lang, where, true);
  }
}
