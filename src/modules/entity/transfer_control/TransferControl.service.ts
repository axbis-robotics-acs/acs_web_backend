import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferControl } from './TransferControl.entity';
import { BaseException } from 'src/common/exceptions/base.exception';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class TransferControlService {
  constructor(
    @InjectRepository(TransferControl)
    private readonly transfercontrolRepository: Repository<TransferControl>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<TransferControl[]> {
    return this.queryRegistryService.select<TransferControl>(
      TransferControl,
      {},
    );
  }

  async findMonitoringCount(): Promise<number> {
    const results = await this.queryRegistryService.select<TransferControl>(
      TransferControl,
      {},
    );
    return results.length;
  }

  async selectOne<K extends keyof TransferControl>(
    where: Pick<TransferControl, K>,
  ): Promise<TransferControl | null> {
    const results = await this.queryRegistryService.select<TransferControl>(
      TransferControl,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(transferControl: TransferControl): Promise<TransferControl> {
    const result = await this.queryRegistryService.create(
      TransferControl,
      transferControl,
      true,
    );

    return result;
  }

  async update<K extends keyof TransferControl>(
    where: Pick<TransferControl, K>,
    transferControlData: TransferControl,
  ): Promise<UpdateResult> {
    const result = await this.queryRegistryService.update<TransferControl>(
      TransferControl,
      where,
      transferControlData,
      true,
    );
    return result;
  }

  async delete<K extends keyof TransferControl>(
    where: Pick<TransferControl, K>,
  ): Promise<DeleteResult> {
    const result = await this.queryRegistryService.delete<TransferControl>(
      TransferControl,
      where,
      true,
    );
    return result;
  }

  async findByTransferid(transfer_id: string): Promise<TransferControl[]> {
    return this.queryRegistryService.select<TransferControl>(TransferControl, {
      transfer_id,
    });
  }

  async searchTasks(
    transfer_id: string,
    transfer_tp: string,
    transfer_source_port: string,
    transfer_dest_port: string,
    transfer_status_tx: string,
    site_cd: string,
  ): Promise<TransferControl[]> {
    return this.queryRegistryService.select<TransferControl>(TransferControl, {
      transfer_id: transfer_id,
      transfer_tp: transfer_tp,
      source_port_id: transfer_source_port,
      destination_port_id: transfer_dest_port,
      transfer_status_tx: transfer_status_tx,
      site_cd: site_cd,
    });
  }
}
