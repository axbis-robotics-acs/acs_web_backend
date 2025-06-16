import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteHist } from './SiteHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class SiteHistService {
  constructor(
    @InjectRepository(SiteHist)
    private readonly siteHistRepository: Repository<SiteHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<SiteHist[]> {
    return this.queryRegistryService.select<SiteHist>(SiteHist, {});
  }

  async selectOne<K extends keyof SiteHist>(
    where: Pick<SiteHist, K>,
  ): Promise<SiteHist | null> {
    const results = await this.queryRegistryService.select<SiteHist>(
      SiteHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(siteData: SiteHist): Promise<SiteHist> {
    return this.queryRegistryService.create<SiteHist>(SiteHist, siteData, true);
  }

  async update<K extends keyof SiteHist>(
    where: Pick<SiteHist, K>,
    siteData: SiteHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<SiteHist>(
      SiteHist,
      where,
      siteData,
      true,
    );
  }

  async delete<K extends keyof SiteHist>(
    where: Pick<SiteHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<SiteHist>(SiteHist, where, true);
  }
}
