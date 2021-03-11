import React, { useState, useEffect } from 'react';
import { useRequest } from 'ice'
import { Box, DatePicker, Divider, TimePicker, Button, Table, Dialog, Drawer, Tag } from '@alifd/next';
import RoomInfoCard from '@/components/RoomInfoCard'
import RoomRsvForm from '@/components/RoomRsvForm'
import { RoomMeeting } from '@/interface/room/meetingRoom'
const { Group: TagGroup } = Tag;

const defaultRoomMeeting: RoomMeeting = {
    id: 0,
    name: '',
    device: '',
    description: '',
    location: '',
    capacity: 0,
    image: '',
    areaId: 0,
    areaName: '',
    adminId: 1,
    reservedTimeList: [],
    status: 1
}

const MeetingRoom = () => {
    const [descVisible, setDescVisible] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [roomInfo, setRoomInfo] = useState<RoomMeeting>(defaultRoomMeeting);

    const { data: roomMeetingList = [], error, loading, request } = useRequest({
        url: '/room/meeting',
        method: 'get',
    });

    useEffect(() => {
        request().then(v => {
            console.log('v', v)
        })
    }, [])

    const handleDialog = (index) => {
        setRoomInfo(roomMeetingList[index]);
        setDescVisible(true)
    }

    const handleDrawer = index => {
        setRoomInfo(roomMeetingList[index]);
        setDrawerVisible(true)
    }

    const renderReservedTime = (value) => {
        return <TagGroup>
            {value && value.map(v => <Tag key={v.start} type="normal" color='orange'><a>{`${v.start} - ${v.end}`}</a></Tag>)}
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
                <Box>
                    <Table dataSource={roomMeetingList} loading={loading}>
                        <Table.Column key='name' title='会议室' dataIndex='name' cell={(v, index) => <a href="javascript:;" onClick={() => handleDialog(index)}>{v}</a>} />
                        <Table.Column key='device' title='设备' dataIndex='device' />
                        <Table.Column key='reservedTimeList' title='预订时间' dataIndex='reservedTimeList' cell={(v) => renderReservedTime(v)} />
                        <Table.Column cell={(v, index) => <a href="javascript:;" onClick={() => handleDrawer(index)}>立即预订</a>} />
                    </Table>
                </Box>
                <Dialog
                    title="房间详情"
                    visible={descVisible}
                    onOk={() => setDescVisible(false)}
                    onCancel={() => setDescVisible(false)}
                    onClose={() => setDescVisible(false)}>
                    <RoomInfoCard roomInfo={roomInfo}></RoomInfoCard>
                </Dialog>
                <Drawer title="标题"
                    placement="right"
                    width='600px'
                    visible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}>
                    <RoomRsvForm roomName={roomInfo.name}></RoomRsvForm>
                </Drawer>
            </div>

        </div>
    )
}

export default MeetingRoom;