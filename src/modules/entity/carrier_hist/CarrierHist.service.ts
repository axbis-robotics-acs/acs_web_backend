import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrierHist } from './CarrierHist.entity';

@Injectable()
export class CarrierHistService {
  constructor(
    @InjectRepository(CarrierHist)
    private readonly carrierhistRepository: Repository<CarrierHist>,
  ) {}

  async findAll(): Promise<CarrierHist[]> {
    return this.carrierhistRepository.find();
  }
}
