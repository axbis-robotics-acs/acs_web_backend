import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { toCamelCase } from '../../utils/date.format';

@Injectable()
export class SocketController {
  constructor(private readonly socketGateway: SocketGateway) {}

  handleGenericEvent(event: string, message: any) {
    const dataSet = message?.dataSet || {};
    const header = message?.header || {};
    const robotId = message?.requestId || 'UNKNOWN';
    const siteId = message?.siteId;
    const eventType = toCamelCase(event);

    let payload: any;

    switch (eventType) {
      case 'positionChange':
        payload = {
          robotId,
          x: dataSet?.x,
          y: dataSet?.y,
          theta: dataSet?.deg,
          siteId,
        };
        break;
      case 'stateChange':
        payload = { robotId, state: dataSet?.state, siteId };
        break;
      case 'locationChange':
        payload = {
          robotId,
          last_node: dataSet?.last_node,
          goal_node: dataSet?.goal_node,
          siteId,
        };
        break;
    }

    this.socketGateway.broadcastSocketEvent(eventType, payload);
  }
}
