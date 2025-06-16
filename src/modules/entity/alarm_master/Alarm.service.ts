import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './Alarm.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Alarm[]> {
    return this.queryRegistryService.select<Alarm>(Alarm, {});
  }

  async findById(area_id: string): Promise<Alarm | null> {
    const results = await this.queryRegistryService.select<Alarm>(Alarm, {
      where: { area_id: area_id },
    });
    return results.length > 0 ? results[0] : null;
  }

  async selectOne<K extends keyof Alarm>(
    where: Pick<Alarm, K>,
  ): Promise<Alarm | null> {
    const results = await this.queryRegistryService.select<Alarm>(Alarm, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(area: Alarm): Promise<Alarm> {
    return this.queryRegistryService.create<Alarm>(Alarm, area, true);
  }

  async update<K extends keyof Alarm>(
    where: Pick<Alarm, K>,
    area: Alarm,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Alarm>(Alarm, where, area, true);
  }

  async delete<K extends keyof Alarm>(
    where: Pick<Alarm, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Alarm>(Alarm, where, true);
  }
}
