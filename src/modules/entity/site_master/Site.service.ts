import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './Site.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Site[]> {
    return this.queryRegistryService.select<Site>(Site, {});
  }

  async selectOne<K extends keyof Site>(
    where: Pick<Site, K>,
  ): Promise<Site | null> {
    const results = await this.queryRegistryService.select<Site>(Site, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(siteData: Site): Promise<Site> {
    return this.queryRegistryService.create<Site>(Site, siteData, true);
  }

  async update<K extends keyof Site>(
    where: Pick<Site, K>,
    siteData: Site,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Site>(Site, where, siteData, true);
  }

  async delete<K extends keyof Site>(
    where: Pick<Site, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Site>(Site, where, true);
  }
}
