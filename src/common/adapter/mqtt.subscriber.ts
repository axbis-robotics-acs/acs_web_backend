import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { MqttPublisher } from './mqtt.publisher.service';
import { getFormattedTimestampTID, parseTimestamp } from '../utils/data-format';
import { QueryRegistry } from '../utils/query/query-registry.service';
import { Robot } from 'src/modules/entity/robot_master/Robot.entity';
import { CommonCriteriaInput } from '../utils/query/common.criteria';
import { globalException } from '../utils/exceptions/global.exception';
import { HeartbeatCacheService } from '../utils/cache/heartbeat.cache.service';

@Controller()
export class MqttSubscriber {
  private readonly logger = new Logger(MqttSubscriber.name);

  constructor(
    private readonly mqttPublisher: MqttPublisher,
    private readonly queryRegistry: QueryRegistry,
    private readonly heartbeatCacheService: HeartbeatCacheService,
  ) {} // ✅ 서비스 주입

  @EventPattern('robot/status/request')
  async handleRobotStatus(@Payload() data: any, @Ctx() context: MqttContext) {
    const criteria = CommonCriteriaInput.build(
      'HU',
      '',
      this.handleRobotStatus.name,
      'middleware',
    );
    this.logger.log(`📥 [robot/status] 메시지: ${JSON.stringify(data)}`);
    this.logger.log(`📍 토픽: ${context.getTopic()}`);

    let status = 'response';
    const RobotEntity = await this.queryRegistry.select(Robot, {
      robot_id: data.robot_id,
    });

    try {
      if (RobotEntity.length == 0) {
        this.logger.error(
          `로봇 ID ${data.robot_id}에 대한 엔티티를 찾을 수 없습니다. 생성을 시도합니다.`,
        );
        status = 'failure';
        this.logger.error(`생성을 위한 데이터: ${JSON.stringify(data)}`);
        await this.queryRegistry.create(Robot, {
          robot_id: data.robot_id,
          battery_no: 0.0,
          ...criteria,
        });
      }
    } catch (error) {
      globalException(error);
    }

    this.sendFeedback('robot/status/response', {
      robot_id: data.robot_id,
      status,
    });
  }

  @EventPattern('robot/command')
  async handleRobotCommand(@Payload() data: any, @Ctx() context: MqttContext) {
    this.logger.log(`📥 [robot/command] 명령 수신: ${JSON.stringify(data)}`);

    if (data.command === 'update') {
      // 여기서 명령 처리 로직 수행
      const result = await this.queryRegistry.update(
        Robot,
        { robot_id: data.robot_id },
        { status_tx: data.status },
      );

      this.logger.log(
        ` [robot/command] 명령 처리 결과: ${JSON.stringify(result)}`,
      );
    } else if (data.command === 'delete') {
      // 여기서 명령 처리 로직 수행
      const result = await this.queryRegistry.delete(Robot, {
        robot_id: data.robot_id,
      });

      this.logger.log(
        ` [robot/command] 명령 처리 결과: ${JSON.stringify(result)}`,
      );
    }
  }

  @EventPattern('robot/+/log') // 와일드카드 토픽도 가능
  handleRobotLog(@Payload() data: any, @Ctx() context: MqttContext) {
    const topic = context.getTopic();
    this.logger.log(`📥 [${topic}] 로봇 로그 수신: ${JSON.stringify(data)}`);
    // topic에서 로봇 ID 추출해서 처리 가능
  }

  @EventPattern('middleware/connection/response')
  handleMiddleWareConnection(
    @Payload() data: any,
    @Ctx() context: MqttContext,
  ) {
    const { tid, update_time } = data;

    const request_tid = this.heartbeatCacheService.hasTidValue(data.tid);
    if (!request_tid) {
      this.logger.error(`TID ${tid}에 대한 요청이 없습니다.`);
      return;
    }
    this.logger.log(
      `📥 [middleware/connection] 응답 수신: ${JSON.stringify(data)}`,
    );

    const rtt = this.heartbeatCacheService.getRttFromTid(tid, update_time);
    if (rtt !== null) {
      this.logger.log(`📶 RTT 측정 완료 - TID: ${tid}, RTT: ${rtt}ms`);
    }

    this.mqttPublisher.rawPublish('middleware/connection/rtt', {
      rtt: rtt,
    });
  }

  private async sendFeedback(topic: string, data: any) {
    const responsePayload = {
      ...data, // 응답 시간 포함
      update_time: getFormattedTimestampTID(),
    };

    this.mqttPublisher.rawPublish(topic, responsePayload);
    this.logger.log(
      `📤 응답 전송 [${topic}]: ${JSON.stringify(responsePayload)}`,
    );
  }
}
