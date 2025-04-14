import {
  Module,
  MiddlewareConsumer,
  NestModule,
  DynamicModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { StatusModule } from './modules/statemanager/status.module';
import { MqttModule } from './common/adapter/mqtt.module';
import { QueryRegistryModule } from './common/utils/query/query-registry.module';
import { CommonScheduleModule } from './modules/scheduler/scheduler.module';
import { CacheModule } from './common/utils/cache/cache.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as dotenv from 'dotenv';

dotenv.config();

// **동적으로 `src/modules/` 내부의 모든 모듈, 서비스, 컨트롤러를 로드하는 함수**
function loadModules(): DynamicModule[] {
  const modulesPath = path.join(__dirname, 'modules', 'entity');
  console.log(modulesPath);

  return fs
    .readdirSync(modulesPath)
    .filter((dir) => fs.statSync(path.join(modulesPath, dir)).isDirectory()) // 폴더만 선택
    .map((dir) => {
      try {
        const dirUpper = dir
          .replace('_master', '')
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const modulePath = path.join(modulesPath, dir, `${dirUpper}.module`);
        const importedModule = require(modulePath);
        const moduleName = Object.keys(importedModule)[0]; // 첫 번째 export된 모듈을 가져옴
        return importedModule[moduleName];
      } catch (error) {
        console.error(`❌ Failed to import module: ${dir}`, error);
        return null;
      }
    })
    .filter((mod): mod is DynamicModule => mod !== null);
}

// **동적으로 `Providers`, `Controllers`를 로드하는 함수**
function loadProvidersAndControllers() {
  const modulesPath = path.join(__dirname, 'modules');
  const providers: any[] = [];
  const controllers: any[] = [];

  fs.readdirSync(modulesPath)
    .filter((dir) => fs.statSync(path.join(modulesPath, dir)).isDirectory())
    .forEach((dir) => {
      try {
        const dirUpper = dir
          .replace('_master', '')
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const servicePath = path.join(modulesPath, dir, `${dirUpper}.service`);
        const controllerPath = path.join(
          modulesPath,
          dir,
          `${dirUpper}.controller`,
        );

        // 서비스 로드
        if (
          fs.existsSync(path.join(modulesPath, dir, `${dirUpper}.service.ts`))
        ) {
          const importedService = require(servicePath);
          Object.values(importedService).forEach((service) =>
            providers.push(service),
          );
        }

        // 컨트롤러 로드
        if (
          fs.existsSync(
            path.join(modulesPath, dir, `${dirUpper}.controller.ts`),
          )
        ) {
          const importedController = require(controllerPath);
          Object.values(importedController).forEach((controller) =>
            controllers.push(controller),
          );
        }
      } catch (error) {
        console.error(
          `❌ Failed to import services/controllers from: ${dir}`,
          error,
        );
      }
    });

  return { providers, controllers };
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
      logging: true,
    }),
    ...loadModules(), // ✅ 자동으로 `modules/` 내부의 모든 모듈 추가
    StatusModule,
    MqttModule,
    CacheModule,
    QueryRegistryModule,
    CommonScheduleModule,
    ScheduleModule.forRoot(),
  ],
  providers: [...loadProvidersAndControllers().providers], // ✅ 자동으로 서비스 추가
  controllers: [...loadProvidersAndControllers().controllers], // ✅ 자동으로 컨트롤러 추가
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
