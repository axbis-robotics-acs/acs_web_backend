// src/common/handler/handler.module.ts
import { Module } from '@nestjs/common';
import { ResponseManager } from './response.manager';
import { PositionManager } from './position.manager';
import { PositionGateway } from '../adapter/websocket/position.gateway';

@Module({
  providers: [ResponseManager, PositionManager, PositionGateway],
  exports: [ResponseManager, PositionManager],
})
export class HandlerModule {}
