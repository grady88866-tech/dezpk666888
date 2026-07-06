# dezpk666888

这是一个多人在线德州扑克（MVP 骨架），仅用于演示与开发。包含：

- 后端：NestJS 风格的 TypeScript 骨架（socket.io 实时示例）
- 前端：React + TypeScript + Vite 简易大厅 + 6 张演示牌桌
- 基础模块：auth / rooms / games / wallet / club
- 数据库：Postgres（示例），缓存：Redis（示例）
- Docker Compose：一键本地启动（postgres + redis + 后端 + 前端）

注意：本仓库为演示用途，币种为站内虚拟金币（不可提现）。上线前请完成安全、合规与压力测试。

快速开始（本地开发）

1. 克隆仓库并进入目录
   git clone https://github.com/grady88866-tech/dezpk666888.git
   cd dezpk666888

2. 复制环境变量模板并修改（可使用默认）
   cp .env.example .env

3. 使用 Docker Compose 启动服务
   docker compose up --build

4. 前端打开： http://localhost:3000
   后端 API： http://localhost:4000

更多文档见 ARCHITECTURE.md
