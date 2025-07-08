import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { toCamelCase } from '../../utils/date.format';

@Injectable()
export class SocketController {
  constructor(private readonly socketGateway: SocketGateway) {}

  handleGenericEvent(event: string, message: any) {
    const dataSet = message?.dataSet || {};
    const header = message?.header || {};
    const robotId = dataSet?.robotId || 'UNKNOWN';
    const siteId = dataSet?.siteId;
    const eventType = toCamelCase(event);

    let payload: any;

    switch (eventType) {
      case 'positionChange':
        payload = {
          robotId,
          x: dataSet?.x,
          y: dataSet?.y,
          theta: dataSet?.theta,
          siteId,
        };
        break;
      case 'stateChange':
        payload = {
          robotId,
          robotModel: dataSet?.robotModel,
          robotState: dataSet?.robotState,
          goalPort: dataSet?.goalPort,
          carrierId: dataSet?.carrierId,
          transferId: dataSet?.transferId,
          siteId,
        };
        break;
      case 'locationChange':
        payload = {
          robotId,
          currentLocation: dataSet?.currentLocation,
          siteId,
        };
        break;
    }

    this.socketGateway.broadcastSocketEvent(eventType, payload);
  }
}
