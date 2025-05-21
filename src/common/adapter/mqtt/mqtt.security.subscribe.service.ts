import { Injectable } from '@nestjs/common';

@Injectable()
export class MqttSecuritySubService {
  handleMessage(topic: string, payload: Buffer) {
    const message = payload.toString();
    console.log(`[InternalSub] ${topic} → ${message}`);
    switch (topic) {
      case 'itk/LD90x/dt/arcl/update':
        if (message.includes('Output:')) {
          // output switch 동작
          console.log('Output switch 동작');
        } else if (message.includes('Input:')) {
          // input switch 동작
          console.log('Input switch 동작');
        }
        break;
      case 'omron/another/topic':
        break;
      default:
        break;
    }
  }
}
