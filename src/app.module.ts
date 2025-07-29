import {
  Module,
  MiddlewareConsumer,
  NestModule,
  DynamicModule,
  Type,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { StatusModule } from './modules/statemanager/status.module';
import { MqttModule } from './common/adapter/mqtt/mqtt.module';
import { QueryRegistryModule } from './common/query/query-registry.module';
import { CommonScheduleModule } from './modules/scheduler/scheduler.module';
import { LocalCacheModule } from './common/cache/cache.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import { ElasticModule } from './common/adapter/elk/elastic.module';
import { MapParserModule } from './modules/map/map.parser.module';
import { WebSocketModule } from './common/adapter/websocket/socket.module';
import { WriterModule } from './common/writer/writer.module';
import { ResponseModule } from './common/handler/response.module';
import { RedisModule } from './common/adapter/redis/redis.module';

dotenv.config();

function toPascalCase(str: string): string {
  return str
    .replace(/_master$/, '')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
// **동적으로 `src/modules/` 내부의 모든 모듈, 서비스, 컨트롤러를 로드하는 함수**
// function loadModules(): DynamicModule[] {
//   const modulesPath = path.join(__dirname, 'modules', 'entity');
//   console.log(modulesPath);

//   return fs
//     .readdirSync(modulesPath)
//     .filter((dir) => fs.statSync(path.join(modulesPath, dir)).isDirectory()) // 폴더만 선택
//     .map((dir) => {
//       try {
//         const dirUpper = dir
//           .replace('_master', '')
//           .split('_')
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join('');
//         const modulePath = path.join(modulesPath, dir, `${dirUpper}.module`);
//         const importedModule = require(modulePath);
//         const moduleName = Object.keys(importedModule)[0]; // 첫 번째 export된 모듈을 가져옴
//         return importedModule[moduleName];
//       } catch (error) {
//         console.error(`❌ Failed to import module: ${dir}`, error);
//         return null;
//       }
//     })
//     .filter((mod): mod is DynamicModule => mod !== null);
// }

function loadModules(): Type<any>[] {
  const modulesPath = path.join(__dirname, 'modules', 'entity');
  const loadedModules: string[] = [];

  return fs
    .readdirSync(modulesPath)
    .filter((dir) => fs.statSync(path.join(modulesPath, dir)).isDirectory())
    .map((dir) => {
      const dirUpper = toPascalCase(dir);
      const moduleFileName = `${dirUpper}.module`;
      const possiblePaths = [
        path.join(modulesPath, dir, `${moduleFileName}.ts`),
        path.join(modulesPath, dir, `${moduleFileName}.js`),
      ];

      const modulePath = possiblePaths.find((p) => fs.existsSync(p));
      if (!modulePath) {
        console.warn(`⚠️ Module file not found for: ${dir}`);
        return null;
      }

      try {
        const imported = require(modulePath);
        const exportedModule = Object.values(imported).find(
          (exp) => typeof exp === 'function'
        );
        if (exportedModule) {
          loadedModules.push(exportedModule.name);
          return exportedModule as Type<any>;
        } else {
          console.warn(`⚠️ No valid module exported in ${modulePath}`);
          return null;
        }
      } catch (error) {
        console.error(`❌ Failed to import module from ${modulePath}`, error);
        return null;
      }
    })
    .filter((mod): mod is Type<any> => mod !== null);
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: false,
    }),
    ...loadModules(), // ✅ 자동으로 `modules/` 내부의 모든 모듈 추가
    StatusModule,
    MqttModule,
    LocalCacheModule,
    QueryRegistryModule,
    CommonScheduleModule,
    ScheduleModule.forRoot(),
    ResponseModule,
    ElasticModule,
    MapParserModule,
    WebSocketModule,
    WriterModule,
    RedisModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        res.header(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );
        if (req.url === '/status/stream') {
          res.header('Cache-Control', 'no-cache');
          res.header('Connection', 'keep-alive');
          res.header('Content-Type', 'text/event-stream');
        }
        next();
      })
      .forRoutes('*');
  }
}
