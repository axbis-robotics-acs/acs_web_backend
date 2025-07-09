import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Port } from './Port.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class PortService {
  constructor(
    @InjectRepository(Port)
    private readonly portRepository: Repository<Port>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Port[]> {
    return this.queryRegistryService.select<Port>(Port, {});
  }

  async selectOne<K extends keyof Port>(
    where: Pick<Port, K>,
  ): Promise<Port | null> {
    const results = await this.queryRegistryService.select<Port>(Port, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(portData: Port): Promise<Port> {
    return this.queryRegistryService.create<Port>(Port, portData, true);
  }

  async update<K extends keyof Port>(
    where: Pick<Port, K>,
    portData: Port,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Port>(Port, where, portData, true);
  }

  async delete<K extends keyof Port>(
    where: Pick<Port, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Port>(Port, where, true);
  }

  async getSourcePorts(site_cd: string): Promise<Port[]> {
    var result = this.queryRegistryService.select<Port>(Port, {
      site_cd: site_cd,
      port_tp: ['LOAD', 'BOTH'], // 아래에서 처리
    });
    return result;
  }

  async getDestinationPorts(site_cd: string): Promise<Port[]> {
    return this.queryRegistryService.select<Port>(Port, {
      site_cd: site_cd,
      port_tp: ['UNLOAD', 'BOTH'], // 아래에서 처리
    });
  }
}
