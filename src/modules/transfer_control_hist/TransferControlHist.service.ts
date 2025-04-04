import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferControlHist } from './TransferControlHist.entity';

@Injectable()
export class TransferControlHistService {
  constructor(
    @InjectRepository(TransferControlHist)
    private readonly transfercontrolhistRepository: Repository<TransferControlHist>,
  ) {}

  async findAll(): Promise<TransferControlHist[]> {
    return this.transfercontrolhistRepository.find();
  }
}
