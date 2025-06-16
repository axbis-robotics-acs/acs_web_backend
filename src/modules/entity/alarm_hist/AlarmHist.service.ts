import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmHist } from './AlarmHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class AlarmHistService {
  constructor(
    @InjectRepository(AlarmHist)
    private readonly alarmHistRepository: Repository<AlarmHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<AlarmHist[]> {
    return this.queryRegistryService.select<AlarmHist>(AlarmHist, {});
  }

  async findById(area_id: string): Promise<AlarmHist | null> {
    const results = await this.queryRegistryService.select<AlarmHist>(
      AlarmHist,
      {
        where: { area_id: area_id },
      },
    );
    return results.length > 0 ? results[0] : null;
  }

  async selectOne<K extends keyof AlarmHist>(
    where: Pick<AlarmHist, K>,
  ): Promise<AlarmHist | null> {
    const results = await this.queryRegistryService.select<AlarmHist>(
      AlarmHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(area: AlarmHist): Promise<AlarmHist> {
    return this.queryRegistryService.create<AlarmHist>(AlarmHist, area, true);
  }

  async update<K extends keyof AlarmHist>(
    where: Pick<AlarmHist, K>,
    area: AlarmHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<AlarmHist>(
      AlarmHist,
      where,
      area,
      true,
    );
  }

  async delete<K extends keyof AlarmHist>(
    where: Pick<AlarmHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<AlarmHist>(AlarmHist, where, true);
  }
}
