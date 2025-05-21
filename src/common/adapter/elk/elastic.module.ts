// elastic.module.ts
import { Module } from '@nestjs/common';
import { ElasticLogService } from './elastic.log.service';

@Module({
  providers: [ElasticLogService],
  exports: [ElasticLogService],
})
export class ElasticModule {}
