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
    try {
      const result = await this.queryRegistryService.create<TransferControl>(
        TransferControl,
        transferControl,
        true,
      );
      console.log('저장 결과:', result);
      return result;
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while creating transfer control',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  async update<K extends keyof TransferControl>(
    where: Pick<TransferControl, K>,
    transferControlData: TransferControl,
  ): Promise<UpdateResult> {
    try {
      const result = await this.queryRegistryService.update<TransferControl>(
        TransferControl,
        where,
        transferControlData,
        true,
      );
      console.log('업데이트 결과:', result);
      return result;
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while updating transfer control',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  async delete<K extends keyof TransferControl>(
    where: Pick<TransferControl, K>,
  ): Promise<DeleteResult> {
    try {
      const result = await this.queryRegistryService.delete<TransferControl>(
        TransferControl,
        where,
        true,
      );
      console.log('삭제 결과:', result);
      return result;
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while deleting transfer control',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  async findByTransferid(transfer_id: string): Promise<TransferControl[]> {
    return this.queryRegistryService.select<TransferControl>(TransferControl, {
      where: { transfer_id },
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
    try {
      console.log(transfer_tp);
      return this.queryRegistryService.select<TransferControl>(
        TransferControl,
        {
          transfer_id: transfer_id,
          transfer_tp: transfer_tp,
          source_port_id: transfer_source_port,
          destination_port_id: transfer_dest_port,
          transfer_status_tx: transfer_status_tx,
          site_cd: site_cd,
        },
      );
    } catch (error) {
      console.error(
        'Error occurred while processing search conditions:',
        error,
      );
      throw new BaseException({
        message: 'Error occurred while processing search conditions',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }
}
