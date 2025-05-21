import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RobotHist } from './RobotHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class RobotHistService {
  constructor(
    @InjectRepository(RobotHist)
    private readonly robothistRepository: Repository<RobotHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<RobotHist[]> {
    return this.queryRegistryService.select<RobotHist>(RobotHist, {});
  }

  async selectOne<K extends keyof RobotHist>(
    where: Pick<RobotHist, K>,
  ): Promise<RobotHist | null> {
    const results = await this.queryRegistryService.select<RobotHist>(
      RobotHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(robotHistData: RobotHist): Promise<RobotHist> {
    return this.queryRegistryService.create<RobotHist>(
      RobotHist,
      robotHistData,
      true,
    );
  }

  async update<K extends keyof RobotHist>(
    where: Pick<RobotHist, K>,
    robotHistData: RobotHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<RobotHist>(
      RobotHist,
      where,
      robotHistData,
      true,
    );
  }

  async delete<K extends keyof RobotHist>(
    where: Pick<RobotHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<RobotHist>(RobotHist, where, true);
  }
}
