# 架构说明（概要）

本项目为多人在线德州扑克 MVP（虚拟金币，不支持提现）。架构由前端（React + socket.io 客户端）、后端（NestJS 风格 Node.js + socket.io）、Redis（房间状态、缓存、锁）与 Postgres（持久化）组成。部署采用 Docker Compose（开发环境）。

主要模块：
- auth: 用户认证（JWT）、会话管理
- rooms: 大厅、房间创建/加入/座位分配
- games: 游戏控制（发牌、轮次、比牌、结算）
- wallet: 用户钱包与流水（下注冻结、结算）
- club: 俱乐部/好友局管理
- socket: 实时通信网关，负责房间广播与客户端事件

数据流（简述）：
1. 用户登录后获得 JWT
2. 前端通过 socket.io 加入房间频道
3. 游戏状态存在 Redis，后端在关键节点写入 Postgres 作为历史与审计
4. 结算时后端在 DB 事务中变更钱包并写流水，保证原子性

扩展/生产注意：
- 随机性/发牌：生产环境需采用可信 RNG，会记录随机种子供审计
- 反作弊：需要更复杂的行为分析与牌谱检测
- 负载：水平扩展时需保证 socket.io 采用消息总线（Redis adapter）或使用 sticky-session 方案

