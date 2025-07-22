import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Robot } from './Robot.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>,
    private readonly dataSource: DataSource,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Robot[]> {
    return this.queryRegistryService.select<Robot>(Robot, {});
  }
  async findRobotBySite(site_cd: string): Promise<Robot[]> {
    return this.queryRegistryService.select<Robot>(Robot, {
      site_cd: site_cd,
    });
  }

  async findRobotMonitoringSummary(site_cd : string): Promise<any> {
    const result = await this.dataSource.query(`
      SELECT
        COUNT(*) AS total_robot_count,
        SUM(CASE WHEN status_tx  IN ('allocated','running', 'loading', 'unloading','waiting','blocking') THEN 1 ELSE 0 END) AS working_robot_count,
        SUM(CASE WHEN status_tx  IN ('IDLE') THEN 1 ELSE 0 END) AS idle_robot_count,
        SUM(CASE WHEN status_tx  = 'CHARGING' THEN 1 ELSE 0 END) AS charging_robot_count
      FROM
        acs_robot_master
      WHERE
        site_cd = ?;
    `, [site_cd]);

    const summary = result[0] || {
      total_robot_count: 0,
      working_robot_count: 0,
      idle_robot_count: 0,
      charging_robot_count: 0,
    };

    return {
      total: Number(summary.total_robot_count),
      working: Number(summary.working_robot_count),
      idle: Number(summary.idle_robot_count),
      charging: Number(summary.charging_robot_count),
    };
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
