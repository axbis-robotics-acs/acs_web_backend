import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './Link.entity';
import { QueryRegistry, UpdateResult, DeleteResult } from '../../../common/utils/query/query-registry.service';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Link[]> {
    return this.queryRegistryService.select<Link>(Link, {});
  }

  async selectOne<K extends keyof Link>(where: Pick<Link, K>): Promise<Link | null> {
    const results = await this.queryRegistryService.select<Link>(Link, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(linkData: Link): Promise<Link> {
    return this.queryRegistryService.create<Link>(Link, linkData, true);
  }

  async update<K extends keyof Link>(where: Pick<Link, K>, linkData: Link): Promise<UpdateResult> {
    return this.queryRegistryService.update<Link>(Link, where, linkData, true);
  }

  async delete<K extends keyof Link>(where: Pick<Link, K>): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Link>(Link, where, true);
  }
}
