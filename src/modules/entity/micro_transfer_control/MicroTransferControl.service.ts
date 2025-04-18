import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseException } from 'src/common/utils/exceptions/base.exception';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';
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
    try {
      const result =
        await this.queryRegistryService.create<MicroTransferControl>(
          MicroTransferControl,
          MicrotransferControl,
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

  async update<K extends keyof MicroTransferControl>(
    where: Pick<MicroTransferControl, K>,
    MicrotransferControlData: MicroTransferControl,
  ): Promise<UpdateResult> {
    try {
      const result =
        await this.queryRegistryService.update<MicroTransferControl>(
          MicroTransferControl,
          where,
          MicrotransferControlData,
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

  async delete<K extends keyof MicroTransferControl>(
    where: Pick<MicroTransferControl, K>,
  ): Promise<DeleteResult> {
    try {
      const result =
        await this.queryRegistryService.delete<MicroTransferControl>(
          MicroTransferControl,
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
    try {
      console.log(transfer_st, site_cd);
      return this.queryRegistryService.select<MicroTransferControl>(
        MicroTransferControl,
        { transfer_st: transfer_st, site_cd: site_cd },
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
