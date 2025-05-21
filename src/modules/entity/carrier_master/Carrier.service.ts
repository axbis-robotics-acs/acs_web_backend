import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrier } from './Carrier.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class CarrierService {
  constructor(
    @InjectRepository(Carrier)
    private readonly carrierRepository: Repository<Carrier>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Carrier[]> {
    return this.queryRegistryService.select<Carrier>(Carrier, {});
  }

  async selectOne<K extends keyof Carrier>(
    where: Pick<Carrier, K>,
  ): Promise<Carrier | null> {
    const results = await this.queryRegistryService.select<Carrier>(
      Carrier,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(carrier: Carrier): Promise<Carrier> {
    return this.queryRegistryService.create<Carrier>(Carrier, carrier, true);
  }

  async update<K extends keyof Carrier>(
    where: Pick<Carrier, K>,
    carrier: Carrier,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Carrier>(
      Carrier,
      where,
      carrier,
      true,
    );
  }

  async delete<K extends keyof Carrier>(
    where: Pick<Carrier, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Carrier>(Carrier, where, true);
  }
}
