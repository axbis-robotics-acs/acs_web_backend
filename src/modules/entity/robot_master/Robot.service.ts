import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot } from './Robot.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Robot[]> {
    return this.queryRegistryService.select<Robot>(Robot, {});
  }

  async selectOne<K extends keyof Robot>(
    where: Pick<Robot, K>,
  ): Promise<Robot | null> {
    const results = await this.queryRegistryService.select<Robot>(Robot, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(robotData: Robot): Promise<Robot> {
    return this.queryRegistryService.create<Robot>(Robot, robotData, true);
  }

  async update<K extends keyof Robot>(
    where: Pick<Robot, K>,
    robotData: Robot,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Robot>(
      Robot,
      where,
      robotData,
      true,
    );
  }

  async delete<K extends keyof Robot>(
    where: Pick<Robot, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Robot>(Robot, where, true);
  }
}
