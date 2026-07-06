import React from 'react'
import { Card, Button } from 'antd'
import { socket } from '../socket'

export default function TableCard({ room }: any){
  const join = ()=>{
    const username = '玩家' + Math.floor(Math.random()*1000)
    socket.emit('join_table', { tableId: room.id, username })
    // 简单跳转到房间页面（TODO）
    alert(`${username} 已加入 ${room.name}（本 demo 仅演示 socket 事件）`)
  }

  return (
    <Card title={room.name} style={{ width: '100%' }}>
      <p>人数：{room.players}/{room.maxPlayers}</p>
      <p>底注：{room.stake}</p>
      <Button type="primary" onClick={join}>加入</Button>
    </Card>
  )
}
