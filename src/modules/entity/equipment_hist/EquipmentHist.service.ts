import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentHist } from './EquipmentHist.entity';
import { QueryRegistry, UpdateResult, DeleteResult } from '../../../common/utils/query/query-registry.service';

@Injectable()
export class EquipmentHistService {
  constructor(
    @InjectRepository(EquipmentHist)
    private readonly equipmenthistRepository: Repository<EquipmentHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<EquipmentHist[]> {
    return this.queryRegistryService.select<EquipmentHist>(EquipmentHist, {});
  }

  async selectOne<K extends keyof EquipmentHist>(where: Pick<EquipmentHist, K>): Promise<EquipmentHist | null> {
    const results = await this.queryRegistryService.select<EquipmentHist>(EquipmentHist, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(equipmentHistData: EquipmentHist): Promise<EquipmentHist> {
    return this.queryRegistryService.create<EquipmentHist>(EquipmentHist, equipmentHistData, true);
  }

  async update<K extends keyof EquipmentHist>(where: Pick<EquipmentHist, K>, equipmentHistData: EquipmentHist): Promise<UpdateResult> {
    return this.queryRegistryService.update<EquipmentHist>(EquipmentHist, where, equipmentHistData, true);
  }

  async delete<K extends keyof EquipmentHist>(where: Pick<EquipmentHist, K>): Promise<DeleteResult> {
    return this.queryRegistryService.delete<EquipmentHist>(EquipmentHist, where, true);
  }
}
