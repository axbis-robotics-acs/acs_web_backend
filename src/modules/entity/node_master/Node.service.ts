import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './Node.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    private readonly queryRegistryService: QueryRegistry,
  ) { }

  async findAll(site_cd: string): Promise<Node[]> {
    return this.queryRegistryService.select<Node>(Node, { site_cd });
  }

  async selectOne<K extends keyof Node>(
    where: Pick<Node, K>,
  ): Promise<Node | null> {
    const results = await this.queryRegistryService.select<Node>(Node, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(nodeData: Node): Promise<Node> {
    return this.queryRegistryService.create<Node>(Node, nodeData, true);
  }

  async createAll(nodeData: Node[]): Promise<void> {
    await this.nodeRepository.save<Node>(nodeData);
  }

  async update<K extends keyof Node>(
    where: Pick<Node, K>,
    nodeData: Node,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Node>(Node, where, nodeData, true);
  }

  async delete<K extends keyof Node>(
    where: Pick<Node, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Node>(Node, where, true);
  }
}
