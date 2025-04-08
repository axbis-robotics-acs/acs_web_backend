import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Const } from './Const.entity';

@Injectable()
export class ConstService {
  constructor(
    @InjectRepository(Const)
    private readonly constRepository: Repository<Const>,
  ) {}

  async findAll(): Promise<Const[]> {
    return this.constRepository.find();
  }
}
