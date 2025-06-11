import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // CORS 설정 필요시 추가
  },
})
export class PositionGateway {
  @WebSocketServer()
  server: Server;

  broadcastPositionChange(positionData: any) {
    console.log('[PositionGateway] Broadcasting positionChange', positionData);
    this.server.emit('positionChange', positionData);
  }
}
