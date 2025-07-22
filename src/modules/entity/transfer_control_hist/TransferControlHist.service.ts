import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { TransferControlHist } from './TransferControlHist.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { BaseException } from 'src/common/exceptions/base.exception';

@Injectable()
export class TransferControlHistService {
  constructor(
    @InjectRepository(TransferControlHist)
    private readonly transfercontrolhistRepository: Repository<TransferControlHist>,
    private readonly dataSource: DataSource,  
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<TransferControlHist[]> {
    return this.queryRegistryService.select<TransferControlHist>(
      TransferControlHist,
      {},
    );
  }

  async findTransferBySite(site_cd:string): Promise<TransferControlHist[]> {
    return this.queryRegistryService.select<TransferControlHist>(
      TransferControlHist,
      { site_cd: site_cd },
    );
  } 

  async findMonitoringSummary(site_cd : string): Promise<any> {
    const result = await this.dataSource.query(`
    WITH latest_status AS (
      SELECT
        h1.transfer_id,
        h1.transfer_status_tx,
        h1.modify_at
      FROM
        acs_transfer_control_hist h1
      INNER JOIN (
        SELECT
          transfer_id,
          MAX(modify_at) AS max_modify_at
        FROM
          acs_transfer_control_hist
        WHERE
          DATE(modify_at) = CURDATE()
          AND site_cd = ?
        GROUP BY
          transfer_id
      ) h2
      ON h1.transfer_id = h2.transfer_id AND h1.modify_at = h2.max_modify_at
    )
    SELECT
      COUNT(*) AS total_task_count,
      SUM(CASE WHEN transfer_status_tx IN ('READY', 'QUEUED', 'TRANSFERRING') THEN 1 ELSE 0 END) AS running_task_count,
      SUM(CASE WHEN transfer_status_tx = 'completed' THEN 1 ELSE 0 END) AS completed_task_count,
      SUM(CASE WHEN transfer_status_tx IN ('canceled', 'aborted') THEN 1 ELSE 0 END) AS canceled_task_count
    FROM
      latest_status
  `, [site_cd]);

    const summary = result[0] || {
      total_task_count: 0,
      running_task_count: 0,
      completed_task_count: 0,
      canceled_task_count: 0,
    };

    // 숫자형으로 변환
    return {
      total: Number(summary.total_task_count),
      running: Number(summary.running_task_count),
      completed: Number(summary.completed_task_count),
      canceled: Number(summary.canceled_task_count),
    };
  }

  async selectOne<K extends keyof TransferControlHist>(
    where: Pick<TransferControlHist, K>,
  ): Promise<TransferControlHist | null> {
    const results = await this.queryRegistryService.select<TransferControlHist>(
      TransferControlHist,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(
    transferControlHistData: TransferControlHist,
  ): Promise<TransferControlHist> {
    return this.queryRegistryService.create<TransferControlHist>(
      TransferControlHist,
      transferControlHistData,
      true,
    );
  }

  async update<K extends keyof TransferControlHist>(
    where: Pick<TransferControlHist, K>,
    transferControlHistData: TransferControlHist,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<TransferControlHist>(
      TransferControlHist,
      where,
      transferControlHistData,
      true,
    );
  }

  async delete<K extends keyof TransferControlHist>(
    where: Pick<TransferControlHist, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<TransferControlHist>(
      TransferControlHist,
      where,
      true,
    );
  }

  async searchTasks(
    transfer_status_tx: string,
    site_cd: string,
  ): Promise<TransferControlHist[]> {
    try {
      const tableName = this.transfercontrolhistRepository.metadata.tableName;

      const whereClauses: string[] = [];
      const params: any[] = [];

      if (
        transfer_status_tx !== '' &&
        transfer_status_tx !== null &&
        transfer_status_tx !== undefined
      ) {
        whereClauses.push('transfer_status_tx = ?');
        params.push(transfer_status_tx);
      }

      if (site_cd !== '' && site_cd !== null && site_cd !== undefined) {
        whereClauses.push('site_cd = ?');
        params.push(site_cd);
      }

      const whereSQL =
        whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

      const query = `
        SELECT * FROM (
          SELECT * FROM ${tableName}
          ${whereSQL}
          ORDER BY create_at DESC
        ) AS t
        GROUP BY transfer_id
        ORDER BY create_at DESC
      `;

      const raw = await this.transfercontrolhistRepository.query(query, params);

      return raw.map((row) => this.transfercontrolhistRepository.create(row));
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while searching tasks',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }
}
