import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferControl } from './TransferControl.entity';

@Injectable()
export class TransferControlService {
  constructor(
    @InjectRepository(TransferControl)
    private readonly transfercontrolRepository: Repository<TransferControl>,
  ) {}

  async findAll(): Promise<TransferControl[]> {
    return this.transfercontrolRepository.find();
  }
}
