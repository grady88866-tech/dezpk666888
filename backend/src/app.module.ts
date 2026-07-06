import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { GamesModule } from './modules/games/games.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { ClubModule } from './modules/club/club.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [AuthModule, RoomsModule, GamesModule, WalletModule, ClubModule, SocketModule],
})
export class AppModule {}
