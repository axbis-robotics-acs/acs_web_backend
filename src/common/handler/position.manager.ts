import { Injectable } from '@nestjs/common';
import { PositionGateway } from '../adapter/websocket/position.gateway';

@Injectable()
export class PositionManager {
  constructor(private readonly positionGateway: PositionGateway) {}

  handlePositionChange(topic: string, message: any) {
    console.log('[PositionManager] handlePositionChange', message);

    const dataSet = message?.dataSet || {};
    const header = message?.header || {};

    const positionData = {
      robotId: header?.requestId || 'UNKNOWN',
      x: dataSet?.x,
      y: dataSet?.y,
      theta: dataSet?.deg,
      siteId: header?.siteId,
    };

    // WebSocket broadcast
    this.positionGateway.broadcastPositionChange(positionData);
  }
}
