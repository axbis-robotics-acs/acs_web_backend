import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Port } from './Port.entity';

@Injectable()
export class PortService {
  constructor(
    @InjectRepository(Port)
    private readonly portRepository: Repository<Port>,
  ) {}

  async findAll(): Promise<Port[]> {
    return this.portRepository.find();
  }
}
