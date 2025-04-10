import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager, ObjectLiteral } from 'typeorm';

@Injectable()
export class QueryRegistry {
  constructor(private readonly em: EntityManager) {}

  async select<T extends ObjectLiteral>(
    entity: { new (): T },
    conditions: Record<string, any>,
  ): Promise<T[]> {
    const repo = this.em.getRepository(entity);
    const alias = repo.metadata.tableName;
    const qb = repo.createQueryBuilder(alias);

    let index = 0;
    for (const [field, value] of Object.entries(conditions)) {
      const paramName = `param${index++}`;
      qb.andWhere(`${alias}.${field} = :${paramName}`, { [paramName]: value });
    }

    return qb.getMany();
  }

  async create<T extends ObjectLiteral>(
    entity: { new (): T },
    data: DeepPartial<T>,
  ): Promise<T> {
    return await this.em.getRepository(entity).save(data);
  }

  async update<T extends ObjectLiteral>(
    entity: { new (): T },
    where: Partial<T>,
    updateData: Partial<T>,
  ): Promise<UpdateResult> {
    const result = await this.em
      .getRepository(entity)
      .update(where, updateData);
    return {
      raw: result.raw,
      affected: result.affected ?? undefined,
    };
  }

  async delete<T extends ObjectLiteral>(
    entity: { new (): T },
    where: Partial<T>,
  ): Promise<DeleteResult> {
    const result = await this.em.getRepository(entity).delete(where);
    return {
      raw: result.raw,
      affected: result.affected ?? undefined,
    };
  }
}

export interface UpdateResult {
  raw: any; // DB에서 반환된 원시 결과 (쿼리 엔진에 따라 다름)
  affected?: number; // 영향을 받은 row 수
}

export interface DeleteResult {
  raw: any; // DB에서 반환된 원시 결과 (쿼리 엔진에 따라 다름)
  affected?: number; // 영향을 받은 row 수
}
