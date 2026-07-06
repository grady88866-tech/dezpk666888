import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col } from 'antd'
import TableCard from '../components/TableCard'

export default function Lobby(){
  const [rooms, setRooms] = useState<any[]>([])

  useEffect(()=>{
    fetch('/rooms/list').then(r=>r.json()).then(data=>setRooms(data.rooms))
  },[])

  return (
    <div style={{ padding: 20 }}>
      <h2>大厅（演示）</h2>
      <Row gutter={[16,16]}>
        {rooms.map(room=> (
          <Col key={room.id} span={8}>
            <TableCard room={room} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
