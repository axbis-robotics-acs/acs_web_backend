import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userclass } from './Userclass.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/utils/query/query-registry.service';

@Injectable()
export class UserclassService {
  constructor(
    @InjectRepository(Userclass)
    private readonly userclassRepository: Repository<Userclass>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<Userclass[]> {
    return this.queryRegistryService.select<Userclass>(Userclass, {});
  }

  async selectOne<K extends keyof Userclass>(
    where: Pick<Userclass, K>,
  ): Promise<Userclass | null> {
    const results = await this.queryRegistryService.select<Userclass>(
      Userclass,
      where,
    );
    return results.length > 0 ? results[0] : null;
  }

  async create(userclassData: Userclass): Promise<Userclass> {
    return this.queryRegistryService.create<Userclass>(
      Userclass,
      userclassData,
      true,
    );
  }

  async update<K extends keyof Userclass>(
    where: Pick<Userclass, K>,
    userclassData: Userclass,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Userclass>(
      Userclass,
      where,
      userclassData,
      true,
    );
  }

  async delete<K extends keyof Userclass>(
    where: Pick<Userclass, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Userclass>(Userclass, where, true);
  }
}
