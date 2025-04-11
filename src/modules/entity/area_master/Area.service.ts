import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './Area.entity';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async findAll(): Promise<Area[]> {
    return this.areaRepository.find();
  }
  async findById(area_id: string): Promise<Area | null> {
    return this.areaRepository.findOne({ where: { area_id: area_id } });
  }
}
