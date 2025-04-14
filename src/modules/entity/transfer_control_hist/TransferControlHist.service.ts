import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferControlHist } from './TransferControlHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class TransferControlHistService {
  constructor(
    @InjectRepository(TransferControlHist)
    private readonly transfercontrolhistRepository: Repository<TransferControlHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<TransferControlHist[]> {
    return this.queryRegistryService.select<TransferControlHist>(
      TransferControlHist,
      {},
    );
  }

  async selectOne<K extends keyof TransferControlHist>(
    where: Pick<TransferControlHist, K>,
  ): Promise<TransferControlHist | null> {
    const results = await this.queryRegistryService.select<TransferControlHist>(
      TransferControlHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(
    transferControlHistData: TransferControlHist,
  ): Promise<TransferControlHist> {
    return this.queryRegistryService.create<TransferControlHist>(
      TransferControlHist,
      transferControlHistData,
      true,
    );
  }

  async update<K extends keyof TransferControlHist>(
    where: Pick<TransferControlHist, K>,
    transferControlHistData: TransferControlHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<TransferControlHist>(
      TransferControlHist,
      where,
      transferControlHistData,
      true,
    );
  }

  async delete<K extends keyof TransferControlHist>(
    where: Pick<TransferControlHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<TransferControlHist>(
      TransferControlHist,
      where,
      true,
    );
  }
}
