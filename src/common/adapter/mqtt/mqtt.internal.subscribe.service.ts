import { Injectable } from '@nestjs/common';
import { ResponseManager } from 'src/common/handler/response.manager';
import { ElasticLogService } from 'src/common/adapter/elk/elastic.log.service';

@Injectable()
export class MqttInternalSubService {
  constructor(
    private readonly responseManager: ResponseManager,
    private readonly elas: ElasticLogService,
  ) {}

  handleMessage(topic: string, payload: Buffer) {
    try {
      const message = JSON.parse(payload.toString()); // ✅ 안전한 JSON 변환

      if (topic === 'web/response') {
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
}
