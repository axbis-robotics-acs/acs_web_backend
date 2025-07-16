import { Injectable } from '@nestjs/common';
import { MqttPublishService } from '../adapter/mqtt/mqtt.publisher.service';
import { buildSuccessMessageFromJson } from 'src/common/utils/message.format';

@Injectable()
export class WriterService {
  constructor(private readonly mqttPublisher: MqttPublishService) {}

  public async publishTransferControl(
    workId: string,
    transactionId: string,
    siteId: string,
    userId: string,
    dataSet: any,
  ): Promise<void> {
    const message = buildSuccessMessageFromJson({
      header: {
        requestId: 'ui',
        workId,
        transactionId: transactionId,
        siteId,
        userId,
      },
      dataSet: {
        ...dataSet,
      },
    });

    // 실제 발행
    this.mqttPublisher.publishInternal('web/transfercontrol', message, 0);
  }
}
