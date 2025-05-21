import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortHist } from './PortHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class PortHistService {
  constructor(
    @InjectRepository(PortHist)
    private readonly porthistRepository: Repository<PortHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<PortHist[]> {
    return this.queryRegistryService.select<PortHist>(PortHist, {});
  }

  async selectOne<K extends keyof PortHist>(
    where: Pick<PortHist, K>,
  ): Promise<PortHist | null> {
    const results = await this.queryRegistryService.select<PortHist>(
      PortHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(portHistData: PortHist): Promise<PortHist> {
    return this.queryRegistryService.create<PortHist>(
      PortHist,
      portHistData,
      true,
    );
  }

  async update<K extends keyof PortHist>(
    where: Pick<PortHist, K>,
    portHistData: PortHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<PortHist>(
      PortHist,
      where,
      portHistData,
      true,
    );
  }

  async delete<K extends keyof PortHist>(
    where: Pick<PortHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<PortHist>(PortHist, where, true);
  }
}
