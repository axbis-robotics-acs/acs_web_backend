import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseException } from 'src/common/exceptions/base.exception';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { MicroTransferControlHist } from './MicroTransferControlHist.entity';

@Injectable()
export class MicroTransferControlHistService {
  constructor(
    @InjectRepository(MicroTransferControlHist)
    private readonly microtransfercontrolHistRepository: Repository<MicroTransferControlHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<MicroTransferControlHist[]> {
    return this.queryRegistryService.select<MicroTransferControlHist>(
      MicroTransferControlHist,
      {},
    );
  }

  async selectOne<K extends keyof MicroTransferControlHist>(
    where: Pick<MicroTransferControlHist, K>,
  ): Promise<MicroTransferControlHist | null> {
    const results =
      await this.queryRegistryService.select<MicroTransferControlHist>(
        MicroTransferControlHist,
        where,
      );
    return results.length > 0 ? results[0] : null;
  }

  async create(
    MicrotransferControlHist: MicroTransferControlHist,
  ): Promise<MicroTransferControlHist> {
      const result =
        await this.queryRegistryService.create<MicroTransferControlHist>(
          MicroTransferControlHist,
          MicrotransferControlHist,
          true,
        );
      console.log('저장 결과:', result);
      return result;
  }

  async update<K extends keyof MicroTransferControlHist>(
    where: Pick<MicroTransferControlHist, K>,
    MicrotransferControlHistData: MicroTransferControlHist,
  ): Promise<UpdateResult> {
      const result =
        await this.queryRegistryService.update<MicroTransferControlHist>(
          MicroTransferControlHist,
          where,
          MicrotransferControlHistData,
          true,
        );
      console.log('업데이트 결과:', result);
      return result;
  }

  async delete<K extends keyof MicroTransferControlHist>(
    where: Pick<MicroTransferControlHist, K>,
  ): Promise<DeleteResult> {
      const result =
        await this.queryRegistryService.delete<MicroTransferControlHist>(
          MicroTransferControlHist,
          where,
          true,
        );
      console.log('삭제 결과:', result);
      return result;
  }

  async findByTransferid(
    transfer_id: string,
  ): Promise<MicroTransferControlHist[]> {
    return this.queryRegistryService.select<MicroTransferControlHist>(
      MicroTransferControlHist,
      {
        where: { transfer_id },
      },
    );
  }

  async searchTasks(
    transfer_st: string,
    site_cd: string,
  ): Promise<MicroTransferControlHist[]> {
      console.log(transfer_st, site_cd);
      return this.queryRegistryService.select<MicroTransferControlHist>(
        MicroTransferControlHist,
        { transfer_st: transfer_st, site_cd: site_cd },
      );
  }
}
