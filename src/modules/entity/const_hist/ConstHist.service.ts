import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { ConstHist } from './ConstHist.entity';

@Injectable()
export class ConstHistService {
  constructor(
    @InjectRepository(ConstHist)
    private readonly constHistRepository: Repository<ConstHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<ConstHist[]> {
    return this.queryRegistryService.select<ConstHist>(ConstHist, {});
  }

  async selectOne<K extends keyof ConstHist>(
    where: Pick<ConstHist, K>,
  ): Promise<ConstHist | null> {
    const results = await this.queryRegistryService.select<ConstHist>(
      ConstHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(constData: ConstHist): Promise<ConstHist> {
    return this.queryRegistryService.create<ConstHist>(
      ConstHist,
      constData,
      true,
    );
  }

  async update<K extends keyof ConstHist>(
    where: Pick<ConstHist, K>,
    constData: ConstHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<ConstHist>(
      ConstHist,
      where,
      constData,
      true,
    );
  }

  async delete<K extends keyof ConstHist>(
    where: Pick<ConstHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<ConstHist>(ConstHist, where, true);
  }
}
