import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager, ObjectLiteral, In } from 'typeorm';
import { getFormattedTimestampTID } from '../utils/date.format';

@Injectable()
export class QueryRegistry {
  constructor(private readonly em: EntityManager) {}

  async selectByOrder<T extends ObjectLiteral>(
    entity: { new (): T },
    conditions: Record<string, any>,
    orderBy: Record<string, 'ASC' | 'DESC'>,
  ): Promise<T[]> {
    const repo = this.em.getRepository(entity);
    const alias = repo.metadata.tableName;
    const qb = repo.createQueryBuilder(alias).distinct(true);

    let index = 0;
    for (const [field, value] of Object.entries(conditions)) {
      const paramName = `param${index++}`;

      if (value === '' || value === undefined || value === null) {
        continue; // 빈 문자열, undefined, null은 조건에서 제외
      }

      // ✅ In(...) 타입일 경우
      if (
        value &&
        typeof value === 'object' &&
        '_type' in value &&
        value._type === 'in'
      ) {
        qb.andWhere(`${alias}.${field} IN (:...${paramName})`, {
          [paramName]: value._value,
        });
      }
      // ✅ 일반 배열 (In 생략하고 그냥 배열만 넘긴 경우)
      else if (Array.isArray(value)) {
        qb.andWhere(`${alias}.${field} IN (:...${paramName})`, {
          [paramName]: value,
        });
      }
      // ✅ 일반 equal 조건
      else {
        qb.andWhere(`${alias}.${field} = :${paramName}`, {
          [paramName]: value,
        });
      }
    }

    // 안전한 orderBy 처리
    const safeOrderBy: Record<string, 'ASC' | 'DESC'> = {};
    for (const [field, direction] of Object.entries(orderBy)) {
      const dir = direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      safeOrderBy[`${alias}.${field}`] = dir;
    }

    if (Object.keys(safeOrderBy).length > 0) {
      qb.orderBy(safeOrderBy);
    }

    return qb.getMany();
  }

  async select<T extends ObjectLiteral>(
    entity: { new (): T },
    conditions: Record<string, any>,
  ): Promise<T[]> {
    const repo = this.em.getRepository(entity);
    const alias = repo.metadata.tableName;
    const qb = repo.createQueryBuilder(alias).distinct(true);

    let index = 0;
    for (const [field, value] of Object.entries(conditions)) {
      if (
        value === '' ||
        value === '' ||
        value === undefined ||
        value === null
      ) {
        continue; // 빈 문자열, undefined, null은 조건에서 제외
      }

      const paramName = `param${index++}`;
      qb.andWhere(`${alias}.${field} = :${paramName}`, { [paramName]: value });
    }

    return qb.getMany();
  }

  async selectOne<T extends ObjectLiteral>(
    entity: { new (): T },
    conditions: Partial<T> = {},
  ): Promise<T | null> {
    const results = await this.select<T>(entity, conditions);
    return results.length > 0 ? results[0] : null;
  }

  async create<T extends ObjectLiteral>(
    entity: { new (): T },
    data: DeepPartial<T>,
    hist: boolean,
  ): Promise<T> {
    console.log('create', entity, data, hist);
    const result = await this.em.getRepository(entity).save(data);
    if (hist) {
      await this.tryInsertHist(entity, {
        hist_id: getFormattedTimestampTID() + result.transfer_id,
        ...(result as T),
      });
    }

    return result;
  }

  async update<T extends ObjectLiteral>(
    entity: { new (): T },
    where: Partial<T>,
    updateData: Partial<T>,
    hist: boolean,
  ): Promise<UpdateResult> {
    const result = await this.em
      .getRepository(entity)
      .update(where, updateData);

    const after = await this.selectOne(entity, where);
    if (hist && after) {
      await this.tryInsertHist(entity, {
        hist_id: getFormattedTimestampTID(),
        ...after,
      });
    }

    return {
      raw: result.raw,
      affected: result.affected ?? undefined,
    };
  }

  async delete<T extends ObjectLiteral>(
    entity: { new (): T },
    where: Partial<T>,
    hist: boolean = false,
  ): Promise<DeleteResult> {
    const before = await this.selectOne(entity, where);
    const result = await this.em.getRepository(entity).delete(where);
    if (hist && before) {
      await this.tryInsertHist(entity, {
        hist_id: getFormattedTimestampTID(),
        ...before,
      });
    }
    return {
      raw: result.raw,
      affected: result.affected ?? undefined,
    };
  }

  private async tryInsertHist<T extends ObjectLiteral>(
    entity: { new (): T },
    currentData: T,
  ): Promise<void> {
    try {
      const histEntityName = entity.name + 'Hist';
      const histEntity = (this.em.connection.options.entities as any[]).find(
        (e) => e.name === histEntityName,
      );

      if (!histEntity) return;

      const histRepo = this.em.getRepository(histEntity);
      const histRecord = {
        hist_id: getFormattedTimestampTID(),
        ...currentData,
      };

      await histRepo.insert(histRecord);
    } catch (err) {
      console.warn(`Hist 저장 실패: ${err.message}`);
    }
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
