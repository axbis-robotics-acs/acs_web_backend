import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Map } from './Map.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map)
    private readonly mapRepository: Repository<Map>,
    private readonly queryRegistryService: QueryRegistry,
  ) { }

  async findAll(site_cd: string): Promise<Map[]> {
    return this.queryRegistryService.select<Map>(Map, { site_cd: site_cd });
  }

  async selectOne<K extends keyof Map>(
    where: Pick<Map, K>,
  ): Promise<Map | null> {
    const results = await this.queryRegistryService.select<Map>(Map, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(mapData: Map): Promise<Map> {
    return this.queryRegistryService.create<Map>(Map, mapData, true);
  }

  async update<K extends keyof Map>(
    where: Pick<Map, K>,
    mapData: Map,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Map>(Map, where, mapData, true);
  }

  async delete<K extends keyof Map>(
    where: Pick<Map, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Map>(Map, where, true);
  }

  async findLatestVersion(
    siteCd: string,
    mapNm: string,
  ): Promise<string | null> {
    const latestMap = await this.mapRepository.findOne({
      where: { site_cd: siteCd, map_nm: mapNm },
      order: { map_ver: 'DESC' },
    });

    return latestMap ? latestMap.map_ver : null;
  }
}
