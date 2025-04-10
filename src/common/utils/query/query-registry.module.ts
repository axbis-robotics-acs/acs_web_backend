import { Module } from '@nestjs/common';
import { QueryRegistry } from './query-registry.service';

@Module({
  providers: [QueryRegistry],
  exports: [QueryRegistry],
})
export class QueryRegistryModule {}
