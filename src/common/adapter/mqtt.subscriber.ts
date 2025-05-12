// mqtt.subscriber.ts
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MqttSubscriber {
  @EventPattern('itk/LD90x/dt/arcl/update')
  handleRobotStatus(@Payload() payload: any) {
    const message = payload.message.toString();
    if (message.includes('Output:')) {
      // output switch 동작
      console.log('Output switch 동작');
    } else if (message.includes('Input:')) {
      // input switch 동작
      console.log('Input switch 동작');
    }
    // 처리 로직...
  }

  @EventPattern('middleware/task/response')
  handleTaskResponse(@Payload() payload: any) {
    console.log('📥 [middleware/task/response]', payload);
    // 처리 로직...
  }
}
