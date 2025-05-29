import { Injectable } from '@nestjs/common';
import { ResponseManager } from 'src/common/handler/response.manager';
import { ElasticLogService } from 'src/common/adapter/elk/elastic.log.service';
import { getFormattedTimestampTID } from 'src/common/utils/date.format';
import { MqttCacheService } from 'src/common/cache/mqtt.cache.service';
import { HeartbeatCacheService } from 'src/common/cache/heartbeat.cache.service';

@Injectable()
export class MqttInternalSubService {
  constructor(
    private readonly responseManager: ResponseManager,
    private readonly elas: ElasticLogService,
    private readonly mqttCacheService: MqttCacheService,
    private readonly heatbeatCacheService: HeartbeatCacheService,
  ) {}

  handleMessage(topic: string, payload: Buffer) {
    try {
      const message = JSON.parse(payload.toString());
      if (topic === 'web/backend/connection/response') {
        this.handleHeatbeatMessage(topic, message);
      } else if (topic === 'web/response') {
        const transactionId = message?.header?.transactionId;
        const returnCode = message?.header?.returnCode || 'SUCCESS';

        if (transactionId) {
          this.responseManager.resolve(transactionId, returnCode);
          this.elas.logMessage({
            message: `Response for transactionId: ${transactionId}, returnCode: ${returnCode}`,
            topic: topic,
            payload: payload.toString(),
          });
        } else {
          console.log(
            `No transactionId in response message: ${payload.toString()}`,
          );
          this.elas.logMessage({
            message: `No transactionId in response message`,
            topic: topic,
            payload: payload.toString(),
          });
        }
      }
    } catch (error) {
      console.log(
        `Error processing MQTT message: ${error.message}, topic: ${topic}, payload: ${payload.toString()}`,
      );
      this.elas.logMessage({
        message: `Error processing MQTT message: ${error.message}`,
        error: error,
        topic: topic,
        payload: payload.toString(),
      });
    }
  }

  handleHeatbeatMessage(topic: string, message: any) {
    const tid = message?.header?.transactionId || getFormattedTimestampTID();
    const request_tid = this.heatbeatCacheService.hasTidValue(tid);
    const avaliable = message?.dataSet?.available || false;

    if (request_tid && avaliable) {
      this.heatbeatCacheService.removeTid(tid);
      this.mqttCacheService.add('connectionCount', 10);
      this.mqttCacheService.add('refreshConnection', avaliable);
    } else {
      this.elas.logMessage({
        message: `No matching request_tid for tid: ${tid} web backend connection response`,
        topic: topic,
        payload: JSON.stringify(message),
      });
    }
  }
}
