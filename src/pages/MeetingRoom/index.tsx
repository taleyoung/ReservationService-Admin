import React, { useState } from 'react';
import { Box, DatePicker, Divider, TimePicker, Button, Table, Dialog } from '@alifd/next';
import RoomUnitCard from '../../components/RoomUnitCard'
import RoomInfoCard from '../../components/RoomInfoCard'

const list = [{
    name: '2号楼',
    description: '5-424'
}, {
    name: '2号楼',
    description: '5-424'
}, {
    name: '2号楼',
    description: '5-424'
}, {
    name: '2号楼',
    description: '5-424'
}, {
    name: '2号楼',
    description: '5-424'
}]

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
}, {
    title: '已预订时间',
    dataIndex: 'usedTime'
}]

const roomInfoCardData = {
    name: '5号楼 5-242',
    desc: '位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全',
    image: 'xxxx',
    usedTime: 'xxxx'
}


const MeetingRoom = () => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div>
            <div>
                <h2>会议室预订</h2>
                <Divider></Divider>
            </div>
            <div>
                <DatePicker ></DatePicker>
                <TimePicker style={{ margin: '0 20px ' }}></TimePicker>
                <Button type='primary'>查询</Button>
            </div>
            <div>
                {/* <Box spacing={20} wrap={true} direction='row'>
                    {list.map(item => (
                        <RoomInfoCard key={item.name} title={item.name} desc={item.description}></RoomInfoCard>
                    ))}
                </Box> */}
                <Box>
                    <Table dataSource={roomData}>
                        {tableColumn.map(item => (
                            <Table.Column key={item.title} title={item.title} dataIndex={item.dataIndex} />
                        ))}
                        <Table.Column cell={<a href="javascript:;" onClick={() => setVisible(true)}> 预订信息</a>} />
                    </Table>
                </Box>
                <Dialog
                    title="房间详情"
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    onClose={() => setVisible(false)}>
                    <RoomInfoCard {...roomInfoCardData}></RoomInfoCard>
                </Dialog>
            </div>

        </div>
    )
}

export default MeetingRoom;