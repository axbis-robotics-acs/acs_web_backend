import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { AreaHist } from './AreaHist.entity';

@Injectable()
export class AreaHistService {
  constructor(
    @InjectRepository(AreaHist)
    private readonly areaHistRepository: Repository<AreaHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<AreaHist[]> {
    return this.queryRegistryService.select<AreaHist>(AreaHist, {});
  }

  async findById(area_id: string): Promise<AreaHist | null> {
    const results = await this.queryRegistryService.select<AreaHist>(AreaHist, {
      where: { area_id: area_id },
    });
    return results.length > 0 ? results[0] : null;
  }

  async selectOne<K extends keyof AreaHist>(
    where: Pick<AreaHist, K>,
  ): Promise<AreaHist | null> {
    const results = await this.queryRegistryService.select<AreaHist>(
      AreaHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(area: AreaHist): Promise<AreaHist> {
    return this.queryRegistryService.create<AreaHist>(AreaHist, area, true);
  }

  async update<K extends keyof AreaHist>(
    where: Pick<AreaHist, K>,
    area: AreaHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<AreaHist>(
      AreaHist,
      where,
      area,
      true,
    );
  }

  async delete<K extends keyof AreaHist>(
    where: Pick<AreaHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<AreaHist>(AreaHist, where, true);
  }
}
