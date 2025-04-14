import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './Area.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Area[]> {
    return this.queryRegistryService.select<Area>(Area, {});
  }

  async findById(area_id: string): Promise<Area | null> {
    const results = await this.queryRegistryService.select<Area>(Area, {
      where: { area_id: area_id },
    });
    return results.length > 0 ? results[0] : null;
  }

  async selectOne<K extends keyof Area>(
    where: Pick<Area, K>,
  ): Promise<Area | null> {
    const results = await this.queryRegistryService.select<Area>(Area, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(area: Area): Promise<Area> {
    return this.queryRegistryService.create<Area>(Area, area, true);
  }

  async update<K extends keyof Area>(
    where: Pick<Area, K>,
    area: Area,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Area>(Area, where, area, true);
  }

  async delete<K extends keyof Area>(
    where: Pick<Area, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Area>(Area, where, true);
  }
}
