import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // CORS 설정 필요시 추가
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  broadcastSocketEvent(topic: string, requestData: any) {
    console.log('[SocketGateway] Broadcasting socket event', requestData);
    this.server.emit(topic, requestData);
  }
}
