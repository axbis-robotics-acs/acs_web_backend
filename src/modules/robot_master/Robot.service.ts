import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot } from './Robot.entity';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>,
  ) {}

  async findAll(): Promise<Robot[]> {
    return this.robotRepository.find();
  }
}
