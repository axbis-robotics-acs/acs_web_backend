import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginHist } from './LoginHist.entity';
import { QueryRegistry, UpdateResult, DeleteResult } from '../../../common/utils/query/query-registry.service';

@Injectable()
export class LoginHistService {
  constructor(
    @InjectRepository(LoginHist)
    private readonly loginhistRepository: Repository<LoginHist>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<LoginHist[]> {
    return this.queryRegistryService.select<LoginHist>(LoginHist, {});
  }

  async selectOne<K extends keyof LoginHist>(where: Pick<LoginHist, K>): Promise<LoginHist | null> {
    const results = await this.queryRegistryService.select<LoginHist>(LoginHist, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(loginHistData: LoginHist): Promise<LoginHist> {
    return this.queryRegistryService.create<LoginHist>(LoginHist, loginHistData, true);
  }

  async update<K extends keyof LoginHist>(where: Pick<LoginHist, K>, loginHistData: LoginHist): Promise<UpdateResult> {
    return this.queryRegistryService.update<LoginHist>(LoginHist, where, loginHistData, true);
  }

  async delete<K extends keyof LoginHist>(where: Pick<LoginHist, K>): Promise<DeleteResult> {
    return this.queryRegistryService.delete<LoginHist>(LoginHist, where, true);
  }
}
