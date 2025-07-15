import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager, ObjectLiteral, In } from 'typeorm';
import { getFormattedTimestampTID } from '../utils/date.format';
import { BaseException } from '../exceptions/base.exception';

@Injectable()
export class QueryRegistry {
  constructor(private readonly em: EntityManager) {}

  //정렬 기준 포함된 조회. ASC, DESC를 안전하게 파싱함
  async selectByOrder<T extends ObjectLiteral>(
    entity: { new (): T },
    conditions: Record<string, any>,
    orderBy: Record<string, 'ASC' | 'DESC'>,
  ): Promise<T[]> {
    try {
      const repo = this.em.getRepository(entity);
      const alias = repo.metadata.tableName;
      const qb = repo.createQueryBuilder(alias).distinct(true);

      let index = 0;
      for (const [field, value] of Object.entries(conditions)) {
        const paramName = `param${index++}`;

        if (value === '' || value === undefined || value === null) {
          continue; // 빈 문자열, undefined, null은 조건에서 제외
        }

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
        else if (Array.isArray(value)) {
          qb.andWhere(`${alias}.${field} IN (:...${paramName})`, {
            [paramName]: value,
          });
        }
        else {
          qb.andWhere(`${alias}.${field} = :${paramName}`, {
            [paramName]: value,
          });
        }
      }

      const safeOrderBy: Record<string, 'ASC' | 'DESC'> = {};
      for (const [field, direction] of Object.entries(orderBy)) {
        const dir = direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        safeOrderBy[`${alias}.${field}`] = dir;
      }

      if (Object.keys(safeOrderBy).length > 0) {
        qb.orderBy(safeOrderBy);
      }

      return qb.getMany();
    } catch (error) {
      throw new BaseException({
        message: '데이터 조회에 실패했습니다.',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  //조건 기반 조회. 빈 값 필터링 포함 (null, '', undefined 제외)
  async select<T extends ObjectLiteral>(
    entity: { new (): T },
    conditions: Record<string, any>,
  ): Promise<T[]> {
    try {
      const repo = this.em.getRepository(entity);
      const alias = repo.metadata.tableName;
      const qb = repo.createQueryBuilder(alias).distinct(true);

      let index = 0;
      for (const [field, value] of Object.entries(conditions)) {
        if (value === '' || value === undefined || value === null) {
          continue; // 빈 문자열, undefined, null은 조건에서 제외
        }

        const paramName = `param${index++}`;

        if (Array.isArray(value)) {
          qb.andWhere(`${alias}.${field} IN (:...${paramName})`, {
            [paramName]: value,
          });
        } else {
          qb.andWhere(`${alias}.${field} = :${paramName}`, {
            [paramName]: value,
          });
        }
      }

      return qb.getMany();
    } catch (error) {
      throw new BaseException({
        message: '데이터 조회에 실패했습니다.',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  //단건 조회 (select 후 첫 번째 요소 반환)
  async selectOne<T extends ObjectLiteral>(
    entity: { new (): T },
    conditions: Partial<T> = {},
  ): Promise<T | null> {
    try {
      const results = await this.select<T>(entity, conditions);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw new BaseException({
        message: '데이터 조회에 실패했습니다.',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  async create<T extends ObjectLiteral>(
  entity: { new (): T },
  data: DeepPartial<T>,
  hist: boolean,
  uniqueKeys: (keyof T)[] = [],
): Promise<T> {
  try {
    const repository = this.em.getRepository(entity);

    const finalKeys: (keyof T)[] =
      uniqueKeys && uniqueKeys.length > 0
        ? uniqueKeys
        : (repository.metadata.primaryColumns.map((col) => col.propertyName) as (keyof T)[]);

    const whereCondition: Partial<T> = {};
    for (const key of finalKeys) {
      const value = data[key as keyof DeepPartial<T>];
      if (value !== undefined && value !== null) {
        whereCondition[key] = value as any;
      }
    }

    if (Object.keys(whereCondition).length === finalKeys.length) {
      const existing = await repository.findOneBy(whereCondition);
      if (existing) {
        throw new BaseException({
          message: '중복된 키 값이 이미 존재합니다.',
          statusCode: 400,
          debugMessage: `중복 조건: ${JSON.stringify(whereCondition)}`,
        });
      }
    }

    const result = await repository.save(data as T);

    if (hist) {
      await this.tryInsertHist(entity, {
        hist_id: getFormattedTimestampTID() + JSON.stringify(result),
        ...(result as T),
      });
    }

    return result;
  } catch (error) {
    throw new BaseException({
      message: '생성에 실패하였습니다.',
      statusCode: 500,
      debugMessage: error.message,
    });
  }
}

  async update<T extends ObjectLiteral>(
    entity: { new (): T },
    where: Partial<T>,
    updateData: Partial<T>,
    hist: boolean,
  ): Promise<UpdateResult> {
    try {
      const result = await this.em
      .getRepository(entity)
      .update(where, updateData);

      if (!result.affected || result.affected === 0) {
        throw new BaseException({
          message: '데이터 수정에 실패했습니다.',
          statusCode: 400,
          debugMessage: `조건에 해당하는 데이터가 존재하지 않거나 변경할 내용이 없습니다. where=${JSON.stringify(where)}`,
        });
      }

      const after = await this.selectOne(entity, where);
      if (hist && after) {
        await this.tryInsertHist(entity, {
          hist_id: getFormattedTimestampTID(),
          ...after,
        });
      }

      return {
        raw: result.raw,
        affected: result.affected,
      };
    } catch (error) {
      throw new BaseException({
        message: '데이터 수정에 실패했습니다.',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  async delete<T extends ObjectLiteral>(
    entity: { new (): T },
    where: Partial<T>,
    hist: boolean = false,
  ): Promise<DeleteResult> {
    try {
      const before = await this.selectOne(entity, where);
      const result = await this.em.getRepository(entity).delete(where);

      if (!result.affected || result.affected === 0) {
        throw new BaseException({
          message: '데이터 삭제에 실패했습니다.',
          statusCode: 400,
          debugMessage: `조건에 해당하는 데이터가 존재하지 않습니다. where=${JSON.stringify(where)}`,
        });
      }

      if (hist && before) {
        await this.tryInsertHist(entity, {
          hist_id: getFormattedTimestampTID(),
          ...before,
        });
      }
      return {
        raw: result.raw,
        affected: result.affected,
      };
    } catch (error) {
      throw new BaseException({
        message: '데이터 삭제에 실패했습니다.',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  private async tryInsertHist<T extends ObjectLiteral>(
    entity: { new (): T },
    currentData: T,
  ): Promise<void> {
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
