// src/common/handler/handler.module.ts
import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketGateway } from './socket.gateway';

@Module({
  providers: [SocketController, SocketGateway],
  exports: [SocketController],
})
export class WebSocketModule {}
