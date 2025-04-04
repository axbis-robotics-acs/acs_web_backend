import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortHist } from './PortHist.entity';

@Injectable()
export class PortHistService {
  constructor(
    @InjectRepository(PortHist)
    private readonly porthistRepository: Repository<PortHist>,
  ) {}

  async findAll(): Promise<PortHist[]> {
    return this.porthistRepository.find();
  }
}
