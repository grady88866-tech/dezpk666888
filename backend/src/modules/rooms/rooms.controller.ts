import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('rooms')
export class RoomsController {
  @Get('list')
  list() {
    // 返回示例 6 张桌
    const rooms = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      name: `演示桌-${i + 1}`,
      players: Math.floor(Math.random() * 5),
      maxPlayers: 9,
      stake: '1/2'
    }));
    return { rooms };
  }

  @Post('create')
  create(@Body() body: any) {
    // 创建房间示例返回
    return { id: Date.now(), ...body };
  }
}
