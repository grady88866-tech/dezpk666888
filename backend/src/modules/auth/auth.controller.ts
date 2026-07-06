import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: any) {
    // 开发阶段返回 mock JWT
    return { token: 'mock-jwt-token', user: { id: 1, username: body.username } };
  }
}
