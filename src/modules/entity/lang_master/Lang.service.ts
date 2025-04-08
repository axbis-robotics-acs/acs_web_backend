import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lang } from './Lang.entity';

@Injectable()
export class LangService {
  constructor(
    @InjectRepository(Lang)
    private readonly langRepository: Repository<Lang>,
  ) {}

  async findAll(): Promise<Lang[]> {
    return this.langRepository.find();
  }
}
