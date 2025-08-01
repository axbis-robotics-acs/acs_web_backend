// src/common/utils/cache/heartbeat-cache.module.ts
import { Module } from '@nestjs/common';
import { HeartbeatCacheService } from './heartbeat.cache.service';
import { TransferStateCacheService } from './transfercontrol.cache.service';
import { MqttCacheService } from './mqtt.cache.service';

@Module({
  providers: [
    HeartbeatCacheService,
    TransferStateCacheService,
    MqttCacheService,
  ],
  exports: [HeartbeatCacheService, TransferStateCacheService, MqttCacheService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class LocalCacheModule {}
// src/common/utils/cache/heartbeat.cache.service.ts
