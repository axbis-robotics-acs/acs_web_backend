// status.controller.ts
import { Controller, Sse, MessageEvent, Post, Body } from '@nestjs/common';
import { MqttPublishService } from './mqtt.publisher.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttPublisher: MqttPublishService) {}

  @Post('publish')
  publishMessage(@Body() body: { topic: string; message: string }) {
    // Publish logic here
    console.log('Publishing to topic:', body.topic);
    console.log('Publishing message:', body.message);
    const message = {
      command: body.message,
    };

    this.mqttPublisher.publishOmron(body.topic, message, 0);
    return { success: true };
  }
}
