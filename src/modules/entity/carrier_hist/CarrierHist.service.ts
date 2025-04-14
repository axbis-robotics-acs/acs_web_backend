import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrierHist } from './CarrierHist.entity';
import { QueryRegistry, UpdateResult, DeleteResult } from '../../../common/utils/query/query-registry.service';

@Injectable()
export class CarrierHistService {
  constructor(
    @InjectRepository(CarrierHist)
    private readonly carrierhistRepository: Repository<CarrierHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<CarrierHist[]> {
    return this.queryRegistryService.select<CarrierHist>(CarrierHist, {});
  }

  async selectOne<K extends keyof CarrierHist>(where: Pick<CarrierHist, K>): Promise<CarrierHist | null> {
    const results = await this.queryRegistryService.select<CarrierHist>(CarrierHist, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(carrierHist: CarrierHist): Promise<CarrierHist> {
    return this.queryRegistryService.create<CarrierHist>(CarrierHist, carrierHist, true);
  }

  async update<K extends keyof CarrierHist>(where: Pick<CarrierHist, K>, carrierHist: CarrierHist): Promise<UpdateResult> {
    return this.queryRegistryService.update<CarrierHist>(CarrierHist, where, carrierHist, true);
  }

  async delete<K extends keyof CarrierHist>(where: Pick<CarrierHist, K>): Promise<DeleteResult> {
    return this.queryRegistryService.delete<CarrierHist>(CarrierHist, where, true);
  }
}
