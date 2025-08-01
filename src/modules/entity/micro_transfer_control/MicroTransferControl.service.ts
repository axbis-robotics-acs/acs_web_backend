import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseException } from 'src/common/exceptions/base.exception';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { MicroTransferControl } from './MicroTransferControl.entity';

@Injectable()
export class MicroTransferControlService {
  constructor(
    @InjectRepository(MicroTransferControl)
    private readonly microtransfercontrolRepository: Repository<MicroTransferControl>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<MicroTransferControl[]> {
    return this.queryRegistryService.select<MicroTransferControl>(
      MicroTransferControl,
      {},
    );
  }

  async selectOne<K extends keyof MicroTransferControl>(
    where: Pick<MicroTransferControl, K>,
  ): Promise<MicroTransferControl | null> {
    const results =
      await this.queryRegistryService.select<MicroTransferControl>(
        MicroTransferControl,
        where,
      );
    return results.length > 0 ? results[0] : null;
  }

  async create(
    MicrotransferControl: MicroTransferControl,
  ): Promise<MicroTransferControl> {
    const result = await this.queryRegistryService.create<MicroTransferControl>(
      MicroTransferControl,
      MicrotransferControl,
      true,
    );
    return result;
  }

  async update<K extends keyof MicroTransferControl>(
    where: Pick<MicroTransferControl, K>,
    MicrotransferControlData: MicroTransferControl,
  ): Promise<UpdateResult> {
    const result = await this.queryRegistryService.update<MicroTransferControl>(
      MicroTransferControl,
      where,
      MicrotransferControlData,
      true,
    );
    return result;
  }

  async delete<K extends keyof MicroTransferControl>(
    where: Pick<MicroTransferControl, K>,
  ): Promise<DeleteResult> {
    const result = await this.queryRegistryService.delete<MicroTransferControl>(
      MicroTransferControl,
      where,
      true,
    );
    return result;
  }

  async findByTransferid(transfer_id: string): Promise<MicroTransferControl[]> {
    return this.queryRegistryService.select<MicroTransferControl>(
      MicroTransferControl,
      {
        where: { transfer_id },
      },
    );
  }

  async searchTasks(
    transfer_st: string,
    site_cd: string,
  ): Promise<MicroTransferControl[]> {
    return this.queryRegistryService.select<MicroTransferControl>(
      MicroTransferControl,
      { transfer_st: transfer_st, site_cd: site_cd },
    );
  }
}
