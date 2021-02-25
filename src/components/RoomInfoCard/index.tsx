import React, { FC, useState } from 'react'
import { Card, Button, Dialog, Table } from '@alifd/next';

interface IProps {
    title: string,
    desc: string
}

const roomData = [{
    id: 1,
    unitName: '2号楼',
    roomName: '2-545'
}, {
    id: 2,
    unitName: '2号楼',
    roomName: '2-545'
}, {
    id: 3,
    unitName: '2号楼',
    roomName: '2-545'
}]

const tableColumn = [{
    title: 'id',
    dataIndex: 'id'
}, {
    title: '房间单元',
    dataIndex: 'unitName'
}, {
    title: '房间号',
    dataIndex: 'roomName'
}, {
    title: '房间描述',
    dataIndex: 'description'
}]


const RoomInfoCard: FC<IProps> = ({ title, desc }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return <div>
        <Card free style={{ width: 300, margin: 20 }}>
            <Card.Header title={title} style={{ width: 300 }} />
            <Card.Content>
                {desc}
            </Card.Content>
            <Card.Divider inset />
            <Card.Actions>
                <Button type="primary" key="action1" text>快速预订</Button>
                <Button type="primary" key="action2" text onClick={() => setVisible(true)}>详情</Button>
            </Card.Actions>
        </Card>
        <Dialog
            title="预订详情"
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            onClose={() => setVisible(false)}>
            <Table dataSource={roomData}>
                {tableColumn.map(item => (
                    <Table.Column key={item.title} title={item.title} dataIndex={item.dataIndex} />
                ))}
                <Table.Column cell={<a href="javascript:;">立即预订</a>} />
            </Table>
        </Dialog>
    </div>
}

export default RoomInfoCard;