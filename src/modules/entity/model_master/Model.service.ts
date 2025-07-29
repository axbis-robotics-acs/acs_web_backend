import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';
import { Model } from './Model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly ModelRepository: Repository<Model>,
    private readonly queryRegistryService: QueryRegistry,
  ) { }

  async findAll(site_cd: string): Promise<Model[]> {
    return this.queryRegistryService.select<Model>(Model, { site_cd: site_cd });
  }

  async findById(model_nm: string): Promise<Model | null> {
    const results = await this.queryRegistryService.select<Model>(Model, {
      where: { model_nm: model_nm },
    });
    return results.length > 0 ? results[0] : null;
  }

  async selectOne<K extends keyof Model>(
    where: Pick<Model, K>,
  ): Promise<Model | null> {
    const results = await this.queryRegistryService.select<Model>(Model, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(area: Model): Promise<Model> {
    return this.queryRegistryService.create<Model>(Model, area, true);
  }

  async update<K extends keyof Model>(
    where: Pick<Model, K>,
    area: Model,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<Model>(Model, where, area, true);
  }

  async delete<K extends keyof Model>(
    where: Pick<Model, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<Model>(Model, where, true);
  }
}
