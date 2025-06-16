import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LangHist } from './LangHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class LangHistService {
  constructor(
    @InjectRepository(LangHist)
    private readonly langHistRepository: Repository<LangHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<LangHist[]> {
    return this.queryRegistryService.select<LangHist>(LangHist, {});
  }

  async selectOne<K extends keyof LangHist>(
    where: Pick<LangHist, K>,
  ): Promise<LangHist | null> {
    const results = await this.queryRegistryService.select<LangHist>(
      LangHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(langData: LangHist): Promise<LangHist> {
    return this.queryRegistryService.create<LangHist>(LangHist, langData, true);
  }

  async update<K extends keyof LangHist>(
    where: Pick<LangHist, K>,
    langData: LangHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<LangHist>(
      LangHist,
      where,
      langData,
      true,
    );
  }

  async delete<K extends keyof LangHist>(
    where: Pick<LangHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<LangHist>(LangHist, where, true);
  }
}
