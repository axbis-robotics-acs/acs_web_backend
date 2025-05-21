import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferControlHist } from './TransferControlHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { BaseException } from 'src/common/exceptions/base.exception';

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

  async searchTasks(
    transfer_st: string,
    site_cd: string,
  ): Promise<TransferControlHist[]> {
    try {
      const tableName = this.transfercontrolhistRepository.metadata.tableName;

      const whereClauses: string[] = [];
      const params: any[] = [];

      if (
        transfer_st !== '' &&
        transfer_st !== null &&
        transfer_st !== undefined
      ) {
        whereClauses.push('transfer_st = ?');
        params.push(transfer_st);
      }

      if (site_cd !== '' && site_cd !== null && site_cd !== undefined) {
        whereClauses.push('site_cd = ?');
        params.push(site_cd);
      }

      const whereSQL =
        whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

      const query = `
        SELECT * FROM (
          SELECT * FROM ${tableName}
          ${whereSQL}
          ORDER BY create_at DESC
        ) AS t
        GROUP BY transfer_id
        ORDER BY create_at DESC
      `;

      const raw = await this.transfercontrolhistRepository.query(query, params);

      return raw.map((row) => this.transfercontrolhistRepository.create(row));
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while searching tasks',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }
}
