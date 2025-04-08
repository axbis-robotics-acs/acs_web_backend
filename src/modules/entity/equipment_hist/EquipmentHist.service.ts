import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentHist } from './EquipmentHist.entity';

@Injectable()
export class EquipmentHistService {
  constructor(
    @InjectRepository(EquipmentHist)
    private readonly equipmenthistRepository: Repository<EquipmentHist>,
  ) {}

  async findAll(): Promise<EquipmentHist[]> {
    return this.equipmenthistRepository.find();
  }
}
