import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RobotHist } from './RobotHist.entity';

@Injectable()
export class RobotHistService {
  constructor(
    @InjectRepository(RobotHist)
    private readonly robothistRepository: Repository<RobotHist>,
  ) {}

  async findAll(): Promise<RobotHist[]> {
    return this.robothistRepository.find();
  }
}
