import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { getFormattedTimestampTID } from 'src/common/utils/data-format';
import { HeartbeatCacheService } from './../../common/utils/cache/heartbeat.cache.service';
import { MqttCacheService } from 'src/common/utils/cache/mqtt.cache.service';
import { MqttService } from 'src/common/adapter/mqtt.service';

@Injectable()
export class HeartbeatScheduler {
  private readonly logger = new Logger(HeartbeatScheduler.name);

  constructor(
    private readonly mqttPublisher: MqttService,
    private readonly heartbeatCacheService: HeartbeatCacheService,
    private readonly mqttCacheService: MqttCacheService,
  ) {}

  @Interval(3000) // ✅ 3초마다 실행
  async sendHeartbeat() {
    const tid = getFormattedTimestampTID();
    const updateTime = getFormattedTimestampTID();

    let connectionCount = this.mqttCacheService.get<number>('connectionCount');

    if (connectionCount == null || typeof connectionCount !== 'number') {
      connectionCount = 10;
    } else if (connectionCount > 0) {
      connectionCount--;
    } else {
      connectionCount = 0;
    }
    console.log(`connectionCount: ${connectionCount}`);
    // 캐시에 업데이트된 카운트 저장
    this.heartbeatCacheService.add('request', tid);
    this.mqttCacheService.add('connectionCount', connectionCount);

    const available = connectionCount > 0;
    const message = {
      tid,
      update_time: updateTime,
      available: available,
    };

    // this.logger.log(`📡 Heartbeat 전송: ${JSON.stringify(message)}`);

    this.mqttPublisher.publish('middleware/connection/request', message, 0);
  }
}
