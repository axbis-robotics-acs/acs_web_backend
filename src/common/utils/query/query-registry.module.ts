import { Global, Module } from '@nestjs/common';
import { QueryRegistry } from './query-registry.service';

@Global()
@Module({
  providers: [QueryRegistry],
  exports: [QueryRegistry],
})
export class QueryRegistryModule {}
