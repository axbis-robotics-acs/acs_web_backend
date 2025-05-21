import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { getFormattedTimestampTID } from 'src/common/utils/date.format';
import { HeartbeatCacheService } from '../../common/cache/heartbeat.cache.service';
import { MqttCacheService } from 'src/common/cache/mqtt.cache.service';
import { MqttPublishService } from '../../common/adapter/mqtt/mqtt.publisher.service';
import { ElasticLogService } from 'src/common/adapter/elk/elastic.log.service';

@Injectable()
export class HeartbeatScheduler {
  constructor(
    private readonly mqttPublisher: MqttPublishService,
    private readonly heartbeatCacheService: HeartbeatCacheService,
    private readonly mqttCacheService: MqttCacheService,
    private readonly elasticLogger: ElasticLogService,
  ) {}

  @Interval(3000) // ✅ 3초마다 실행
  async sendHeartbeat() {
    const tid = getFormattedTimestampTID();
    const updateTime = getFormattedTimestampTID();
    const topic = 'middleware/connection/request';

    let connectionCount = this.mqttCacheService.get<number>('connectionCount');

    if (connectionCount == null || typeof connectionCount !== 'number') {
      connectionCount = 10;
    } else if (connectionCount > 0) {
      connectionCount--;
    } else {
      connectionCount = 0;
    }
    // console.log(`connectionCount: ${connectionCount}`);
    // 캐시에 업데이트된 카운트 저장
    this.heartbeatCacheService.add('request', tid);
    this.mqttCacheService.add('connectionCount', connectionCount);

    const available = connectionCount > 0;
    const message = {
      publish_msg: {
        tid,
        update_time: updateTime,
        available: available,
      },
      topic: topic,
    };

    this.elasticLogger.logMessage(message);
    this.mqttPublisher.publishInternal(topic, message, 0);
  }
}
