import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userclass } from './Userclass.entity';

@Injectable()
export class UserclassService {
  constructor(
    @InjectRepository(Userclass)
    private readonly userclassRepository: Repository<Userclass>,
  ) {}

  async findAll(): Promise<Userclass[]> {
    return this.userclassRepository.find();
  }
}
