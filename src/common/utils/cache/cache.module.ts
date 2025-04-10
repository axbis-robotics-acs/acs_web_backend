// src/common/utils/cache/heartbeat-cache.module.ts
import { Module } from '@nestjs/common';
import { HeartbeatCacheService } from './heartbeat.cache.service';

@Module({
  providers: [HeartbeatCacheService],
  exports: [HeartbeatCacheService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class CacheModule {}
// src/common/utils/cache/heartbeat.cache.service.ts
