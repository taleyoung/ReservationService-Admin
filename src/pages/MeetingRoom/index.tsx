import React, { useState, useEffect } from 'react';
import { useRequest } from 'ice'
import { Box, DatePicker, Divider, TimePicker, Button, Table, Dialog, Drawer, Tag } from '@alifd/next';
import RoomInfoCard from '@/components/RoomInfoCard'
import RoomRsvForm from '@/components/RoomRsvForm'
import { MeetingRoomRsv } from '@/interface/room/meetingRoom'
import meetRoomService from '@/service/room/meetingRoom';
import meetingService from '@/service/room/meeting'
const { Group: TagGroup } = Tag;

const defaultRoomMeeting: MeetingRoomRsv = {
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
    rsvTimeList: [],
    status: 1
}

const MeetingRoom = () => {
    const [descVisible, setDescVisible] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [drawerType, setDrawerType] = useState<string>('new');
    const [curMeetingInfo, setCurMeetingInfo] = useState();
    const [roomInfo, setRoomInfo] = useState<MeetingRoomRsv>(defaultRoomMeeting);

    const { data: meetingRoomData = {}, error, loading, request } = useRequest(meetRoomService.getMeetingRoom);
    const { data: meetingInfo = {}, request: getMeetingById } = useRequest(meetingService.getMeetingById);

    useEffect(() => {
        request({ meetingFlag: true });
    }, [])

    const handleDialog = (index) => {
        setRoomInfo(meetingRoomData.list[index]);
        setDescVisible(true)
    }

    const showMeetingInfo = async (meetingId: number) => {
        // getMeetingById(meetingId);
        const data = await getMeetingById(meetingId);
        console.log('meetingInfo :>> ', meetingInfo);
        setCurMeetingInfo(data);
        setDrawerVisible(true)
    }

    const handleRsvDrawer = index => {
        setRoomInfo(meetingRoomData.list[index]);
        setDrawerVisible(true)
    }

    const renderReservedTime = (value) => {
        return <TagGroup>
            {value && value.map(v => <Tag key={v.start} type="normal" color='orange' onClick={() => showMeetingInfo(v.meetingId)}><a>{`${v.start} - ${v.end}`}</a></Tag>)}
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
                    <Table dataSource={meetingRoomData.list} loading={loading}>
                        <Table.Column key='name' title='会议室' dataIndex='name' cell={(v, index) => <a href="javascript:;" onClick={() => handleDialog(index)}>{v}</a>} />
                        <Table.Column key='device' title='设备' dataIndex='device' />
                        <Table.Column key='reservedTimeList' title='预订时间' dataIndex='rsvTimeList' cell={(v) => renderReservedTime(v)} />
                        <Table.Column cell={(v, index) => <a href="javascript:;" onClick={() => handleRsvDrawer(index)}>立即预订</a>} />
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
                <Drawer title="会议详情"
                    placement="right"
                    width='600px'
                    visible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}>
                    <RoomRsvForm roomId={roomInfo.id} roomName={roomInfo.name} meetingInfo={curMeetingInfo}></RoomRsvForm>
                </Drawer>
            </div>

        </div>
    )
}

export default MeetingRoom;