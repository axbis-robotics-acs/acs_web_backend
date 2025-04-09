import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferControl } from './TransferControl.entity';
import { BaseException } from 'src/common/utils/exceptions/base.exception';

@Injectable()
export class TransferControlService {
  constructor(
    @InjectRepository(TransferControl)
    private readonly transfercontrolRepository: Repository<TransferControl>,
  ) {}

  async findAll(): Promise<TransferControl[]> {
    return this.transfercontrolRepository.find();
  }

  async findByTransferid(transfer_id: string): Promise<TransferControl[]> {
    return this.transfercontrolRepository.findBy({ transfer_id });
  }

  async create(transferControl: TransferControl): Promise<TransferControl> {
    return this.transfercontrolRepository.save(transferControl);
  }

  async searchTasks(searchConditions: any): Promise<TransferControl[]> {
    const queryBuilder = this.transfercontrolRepository.createQueryBuilder('transferControl');
  
    for (const key in searchConditions) {
      try {
        if (Object.prototype.hasOwnProperty.call(searchConditions, key) && 
            searchConditions[key] !== undefined &&
            searchConditions[key] !== '') {
          queryBuilder.andWhere(`transferControl.${key} = :${key}`, { [key]: searchConditions[key] });
        } 
      } catch (error) {
        console.error(`Error processing key ${key}:`, error);
        console.error('Original error:', error.stack || error.message || error);

        throw new BaseException({
          message: 'Error occurred while processing search conditions',
          statusCode: 500,
          debugMessage: error.message,
        });
      }
    }
    const result = await queryBuilder.getMany();

    return result;
  }
}
