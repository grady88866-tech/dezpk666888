import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('client connected', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('join_table')
  handleJoin(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { tableId, username } = data;
    client.join(`table_${tableId}`);
    // 广播桌子状态（演示用）
    this.server.to(`table_${tableId}`).emit('table_update', { tableId, msg: `${username} 加入了桌子` });
  }

  @SubscribeMessage('leave_table')
  handleLeave(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { tableId, username } = data;
    client.leave(`table_${tableId}`);
    this.server.to(`table_${tableId}`).emit('table_update', { tableId, msg: `${username} 离开了桌子` });
  }

  @SubscribeMessage('action')
  handleAction(@MessageBody() data: any) {
    const { tableId, action } = data;
    // 转发给桌子内其他玩家
    this.server.to(`table_${tableId}`).emit('action_result', { tableId, action });
  }
}
