import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { MqttPublisher } from 'src/common/adapter/mqtt.publisher.service';
import { getFormattedTimestampTID } from 'src/common/utils/data-format';
import { HeartbeatCacheService } from './../../common/utils/cache/heartbeat.cache.service';

@Injectable()
export class HeartbeatScheduler {
  private readonly logger = new Logger(HeartbeatScheduler.name);

  constructor(
    private readonly mqttPublisher: MqttPublisher,
    private readonly HeartbeatCacheService: HeartbeatCacheService,
  ) {}

  @Interval(3000) // ✅ 3초마다 실행
  async sendHeartbeat() {
    const tid = getFormattedTimestampTID();
    const updateTime = getFormattedTimestampTID();
    this.HeartbeatCacheService.add('request', tid);

    const message = {
      tid,
      update_time: updateTime,
    };

    // this.logger.log(`📡 Heartbeat 전송: ${JSON.stringify(message)}`);

    this.mqttPublisher.rawPublish('middleware/connection/request', message);
  }
}
