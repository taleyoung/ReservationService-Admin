import React, { useState, useEffect } from 'react';
import { useRequest } from 'ice'
import { Box, DatePicker, Divider, TimePicker, Button, Table, Dialog, Drawer, Tag } from '@alifd/next';
import RoomInfoCard from '../../components/RoomInfoCard'
import RoomRsvForm from '../../components/RoomRsvForm'
const { Group: TagGroup } = Tag;
const roomData = [{
    "id": 1,
    "name": "海棠10号楼423",
    "device": "白板 屏幕 远程加入",
    "capacity": 10,
    "location": "10号楼423",
    "description": "网络良好",
    "adminId": 1,
    "status": 1,
    "areaName": "海棠区",
    "areaId": 1,
    reservedTime: [{
        date: "2021-03-02",
        start: '12:00',
        end: '14:00'
    }, {
        date: "2021-03-02",
        start: '15:00',
        end: '19:00'
    }]
}, {
    id: 2,
    name: '海棠会议室2-425',
    reservedTime: [{
        date: "2021-03-02",
        start: '10:00',
        end: '12:00'
    }, {
        date: "2021-03-02",
        start: '12:00',
        end: '14:00'
    }]
}, {
    id: 3,
    name: '海棠会议室2-545',
    reservedTime: [{
        date: "2021-03-02",
        start: '06:00',
        end: '14:00'
    }, {
        date: "2021-03-02",
        start: '15:00',
        end: '17:00'
    }]
}]

const roomInfoCardData = {
    name: '5号楼 5-242',
    desc: '位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全,位于5号楼，会议室设备齐全',
    image: 'xxxx',
    usedTime: 'xxxx'
}


const MeetingRoom = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

    const { data, error, loading, request } = useRequest({
        url: '/room/info',
        method: 'get',
    });

    useEffect(() => {
        request().then(v => {
            console.log('v', v)
        })
    }, [])
    console.log('data', data)

    const renderReservedTime = (value) => {
        return <TagGroup>
            {value.map(v => <Tag type="normal" color='orange'><a>{`${v.start} - ${v.end}`}</a></Tag>)}
        </TagGroup>
    }
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
                        <Table.Column key='name' title='会议室' dataIndex='name' cell={(v) => <a href="javascript:;" onClick={() => setVisible(true)}>{v}</a>} />
                        <Table.Column key='desc' title='描述' dataIndex='desc' />
                        <Table.Column key='reservedTime' title='预订时间' dataIndex='reservedTime' cell={(v) => renderReservedTime(v)} />
                        <Table.Column cell={<a href="javascript:;" onClick={() => setDrawerVisible(true)}>立即预订</a>} />
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
                <Drawer title="标题"
                    placement="right"
                    width='600px'
                    visible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}>
                    <RoomRsvForm></RoomRsvForm>
                </Drawer>
            </div>

        </div>
    )
}

export default MeetingRoom;