// status.controller.ts
import { Controller, Sse, MessageEvent, Post, Body } from '@nestjs/common';
import { MqttsecurityService } from './mqtt.security.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttPublisher: MqttsecurityService) {}
  @Post('publish')
  publishMessage(@Body() body: { topic: string; message: string }) {
    // Publish logic here
    console.log('Publishing to topic:', body.topic);
    console.log('Publishing message:', body.message);
    const message = {
      command: body.message,
    };

    this.mqttPublisher.publish(body.topic, message, 0);
    return { success: true };
  }
}
