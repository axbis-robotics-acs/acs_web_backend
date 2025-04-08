import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRuleRel } from './RoleRuleRel.entity';

@Injectable()
export class RoleRuleRelService {
  constructor(
    @InjectRepository(RoleRuleRel)
    private readonly rolerulerelRepository: Repository<RoleRuleRel>,
  ) {}

  async findAll(): Promise<RoleRuleRel[]> {
    return this.rolerulerelRepository.find();
  }
}
