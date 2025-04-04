import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

// **DB 연결 정보**
const dbConfig = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'admin',
  password: 'password',
  database: 'acs',
});

// **각 테이블별 폴더를 생성할 기본 경로 (`src/modules/`)**
const BASE_DIR = path.join(process.cwd(), '', 'modules');

// **테이블 메타데이터 조회 쿼리**
const TABLE_METADATA_QUERY = `
  SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, COLUMN_KEY, IS_NULLABLE, COLUMN_DEFAULT, EXTRA
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = ?;
`;

// **컬럼 타입 매핑 함수**
const mapMariaDBTypeToTypeORM = (columnType: string): string => {
  if (columnType.includes('tinyint')) return 'number';
  if (columnType.includes('int')) return 'number';
  if (columnType.includes('varchar') || columnType.includes('text'))
    return 'string';
  if (columnType.includes('datetime') || columnType.includes('timestamp'))
    return 'Date';
  return 'any';
};

// 컬럼 데코레이터 생성 함수
const getColumnDecorator = (column: any): string => {
  let decorators: string[] = [];
  let options: string[] = [];

  // **VARCHAR 컬럼 처리 (`length: n`)**
  if (column.COLUMN_TYPE.includes('varchar')) {
    options.push(
      `type: 'varchar', length: ${column.COLUMN_TYPE.match(/\d+/)?.[0] || 255}`,
    );
  } else if (column.COLUMN_TYPE.includes('text')) {
    options.push(`type: 'text'`);
  } else if (column.COLUMN_TYPE.includes('tinyint')) {
    options.push(`type: 'tinyint'`, 'width: 1');
  } else if (
    column.COLUMN_TYPE.includes('datetime') ||
    column.COLUMN_TYPE.includes('timestamp')
  ) {
    if (column.COLUMN_NAME === 'create_at') {
      return `@CreateDateColumn() `;
    } else if (column.COLUMN_NAME === 'modify_at') {
      return `@UpdateDateColumn() `;
    } else {
      options.push(`type: 'datetime'`);
    }
  } else if (
    column.COLUMN_TYPE.includes('int') ||
    column.COLUMN_TYPE.includes('bigint') ||
    column.COLUMN_TYPE.includes('decimal') ||
    column.COLUMN_TYPE.includes('float') ||
    column.COLUMN_TYPE.includes('double')
  ) {
    options.push(`type: 'number'`);
  }

  // **NOT NULL 처리**
  if (column.IS_NULLABLE === 'NO') options.push('nullable: false');
  else options.push('nullable: true');

  // **DEFAULT 값 처리 (`NULL` 문자열 저장 방지)**
  if (column.COLUMN_DEFAULT !== null && column.COLUMN_DEFAULT !== 'NULL') {
    options.push(
      `default: ${isNaN(column.COLUMN_DEFAULT) ? `${column.COLUMN_DEFAULT}` : column.COLUMN_DEFAULT}`,
    );
  }

  // **PK 처리**
  if (column.COLUMN_KEY === 'PRI') {
    decorators.push(`@PrimaryColumn({ ${options.join(', ')} })`);
  } else if (column.EXTRA.includes('auto_increment')) {
    decorators.push(`@PrimaryGeneratedColumn()`);
  } else {
    decorators.push(`@Column({ ${options.join(', ')} })`);
  }

  return decorators.join('\n  ');
};

// **모듈별 파일 생성 함수 (기존 파일이 있으면 덮어쓰기)**
const createModuleFiles = (tableName: string, columns: any[]) => {
  const folderName = tableName.replace('acs_', '');
  const className = folderName
    .replace('_master', '')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const lowerClassName = className.toLowerCase();

  // **테이블별 폴더 경로 설정 (`src/modules/{테이블명}/`)**
  const modulePath = path.join(BASE_DIR, folderName);
  if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath, { recursive: true });

  // **파일 저장 함수 (기존 파일이 있어도 덮어쓰기)**
  const writeFile = (filePath: string, content: string) => {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Generated: ${filePath}`);
  };

  // **Entity 파일 생성**
  let entityContent = `import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: '${tableName}' })
export class ${className} {
`;
  columns.forEach((column) => {
    const columnType = mapMariaDBTypeToTypeORM(column.COLUMN_TYPE);
    const decorator = getColumnDecorator(column);
    entityContent += `  ${decorator} 
  ${column.COLUMN_NAME}: ${columnType}; \n \n`;
  });
  entityContent += `}`;

  writeFile(path.join(modulePath, `${className}.entity.ts`), entityContent);

  // **Service 파일 생성**
  const serviceContent = `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${className} } from './${className}.entity';

@Injectable()
export class ${className}Service {
  constructor(
    @InjectRepository(${className})
    private readonly ${lowerClassName}Repository: Repository<${className}>,
  ) {}

  async findAll(): Promise<${className}[]> {
    return this.${lowerClassName}Repository.find();
  }
}
`;
  writeFile(path.join(modulePath, `${className}.service.ts`), serviceContent);

  // **Controller 파일 생성**
  const controllerContent = `import { Controller, Get, Param } from '@nestjs/common';
import { ${className}Service } from './${className}.service';
import { ${className} } from './${className}.entity';

@Controller('${lowerClassName}')
export class ${className}Controller {
  constructor(private readonly ${lowerClassName}Service: ${className}Service) {}

  @Get()
  async findAll(): Promise<${className}[]> {
    return this.${lowerClassName}Service.findAll();
  }

}
`;
  writeFile(
    path.join(modulePath, `${className}.controller.ts`),
    controllerContent,
  );

  // **Module 파일 생성**
  const moduleContent = `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${className} } from './${className}.entity';
import { ${className}Service } from './${className}.service';
import { ${className}Controller } from './${className}.controller';

@Module({
  imports: [TypeOrmModule.forFeature([${className}])],
  providers: [${className}Service],
  controllers: [${className}Controller],
})
export class ${className}Module {}
`;
  writeFile(path.join(modulePath, `${className}.module.ts`), moduleContent);
};

// **DB 연결 및 테이블 정보를 기반으로 모듈 생성**
const generateModules = async () => {
  await dbConfig.initialize();
  console.log('✅ Database connection established');

  // **테이블 메타데이터 가져오기**
  const tables = await dbConfig.query(TABLE_METADATA_QUERY, [
    dbConfig.options.database,
  ]);

  // **테이블별 컬럼을 그룹화하여 올바른 데이터 구조로 변환**
  const groupedTables: Record<string, any[]> = tables.reduce((acc, column) => {
    if (!acc[column.TABLE_NAME]) acc[column.TABLE_NAME] = [];
    acc[column.TABLE_NAME].push(column);
    return acc;
  }, {});

  Object.entries(groupedTables).forEach(([tableName, columns]) => {
    createModuleFiles(tableName, columns);
  });

  await dbConfig.destroy();
};

generateModules().catch(console.error);
