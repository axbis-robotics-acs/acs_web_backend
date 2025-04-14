import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './Role.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.queryRegistryService.select<Role>(Role, {});
  }

  async selectOne<K extends keyof Role>(
    where: Pick<Role, K>,
  ): Promise<Role | null> {
    const results = await this.queryRegistryService.select<Role>(Role, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(roleData: Role): Promise<Role> {
    return this.queryRegistryService.create<Role>(Role, roleData, true);
  }

  async update<K extends keyof Role>(
    where: Pick<Role, K>,
    roleData: Role,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Role>(Role, where, roleData, true);
  }

  async delete<K extends keyof Role>(
    where: Pick<Role, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Role>(Role, where, true);
  }
}
