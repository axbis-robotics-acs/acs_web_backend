import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { MqttPublisher } from './mqtt.publisher.service';
import { getFormattedTimestamp } from '../utils/data-format';

@Controller()
export class MqttSubscriber {
  private readonly logger = new Logger(MqttSubscriber.name);

  constructor(private readonly mqttPublisher: MqttPublisher) {} // ✅ 서비스 주입

  @EventPattern('robot/status/request')
  handleRobotStatus(@Payload() data: any, @Ctx() context: MqttContext) {
    this.logger.log(`📥 [robot/status] 메시지: ${JSON.stringify(data)}`);
    this.logger.log(`📍 토픽: ${context.getTopic()}`);

    let status = 'response';
    if (data.status !== 'request') {
      status = 'failure';
    }
  
    this.sendFeedback('robot/status/response', {
      robot_id: data.robot_id,
      status,
    });
  }

  @EventPattern('robot/command')
  handleRobotCommand(@Payload() data: any, @Ctx() context: MqttContext) {
    this.logger.log(`📥 [robot/command] 명령 수신: ${JSON.stringify(data)}`);
    // 여기서 명령 처리 로직 수행
  }

  @EventPattern('robot/+/log') // 와일드카드 토픽도 가능
  handleRobotLog(@Payload() data: any, @Ctx() context: MqttContext) {
    const topic = context.getTopic();
    this.logger.log(`📥 [${topic}] 로봇 로그 수신: ${JSON.stringify(data)}`);
    // topic에서 로봇 ID 추출해서 처리 가능
  }

  private async sendFeedback(topic: string, data: any) {
    const responsePayload = {
      ...data,
      tid: getFormattedTimestamp(), // 응답 시간 포함
    };
  
    this.mqttPublisher.rawPublish(topic, responsePayload);
    this.logger.log(`📤 응답 전송 [${topic}]: ${JSON.stringify(responsePayload)}`);
  }
  
}
