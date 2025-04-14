import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from './Equipment.entity';
import { QueryRegistry, UpdateResult, DeleteResult } from '../../../common/utils/query/query-registry.service';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Equipment[]> {
    return this.queryRegistryService.select<Equipment>(Equipment, {});
  }

  async selectOne<K extends keyof Equipment>(where: Pick<Equipment, K>): Promise<Equipment | null> {
    const results = await this.queryRegistryService.select<Equipment>(Equipment, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(equipmentData: Equipment): Promise<Equipment> {
    return this.queryRegistryService.create<Equipment>(Equipment, equipmentData, true);
  }

  async update<K extends keyof Equipment>(where: Pick<Equipment, K>, equipmentData: Equipment): Promise<UpdateResult> {
    return this.queryRegistryService.update<Equipment>(Equipment, where, equipmentData, true);
  }

  async delete<K extends keyof Equipment>(where: Pick<Equipment, K>): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Equipment>(Equipment, where, true);
  }
}
