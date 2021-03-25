import React, { useState, useEffect } from 'react';
import { useRequest } from 'ice'
import { Box, DatePicker, Divider, Icon, Button, Table, Dialog, Drawer, Tag, Search } from '@alifd/next';
import moment from 'moment'
import RoomInfoCard from '@/components/RoomInfoCard'
import RoomRsvForm from '@/components/RoomRsvForm'
import { MeetingRoomRsv } from '@/interface/room/meetingRoom'
import meetRoomService from '@/service/room/meetingRoom';
import meetingService from '@/service/room/meeting'
const { Group: TagGroup } = Tag;

const nowDate = moment().format("YYYY-MM-DD")

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
    const [searchDate, setSearchDate] = useState<string>(nowDate);
    const [descVisible, setDescVisible] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [curMeetingInfo, setCurMeetingInfo] = useState();
    const [roomInfo, setRoomInfo] = useState<MeetingRoomRsv>(defaultRoomMeeting);

    const { data: meetingRoomData = {}, loading, request: getMeetingRoom } = useRequest(meetRoomService.getMeetingRoom);
    const { request: getMeetingById } = useRequest(meetingService.getMeetingById);

    useEffect(() => {
        console.log('new Date(nowDate) :>> ', nowDate, new Date(nowDate));
        getMeetingRoom({ date: new Date(nowDate) });
    }, [])

    const handleDialog = (index) => {
        setRoomInfo(meetingRoomData.list[index]);
        setDescVisible(true)
    }

    const showMeetingInfo = async (meetingId: number) => {
        const data = await getMeetingById(meetingId);
        setCurMeetingInfo(data);
        setDrawerVisible(true)
    }

    const handleRsvDrawer = index => {
        setRoomInfo(meetingRoomData.list[index]);
        setCurMeetingInfo(null)
        setDrawerVisible(true)
    }

    const renderReservedTime = (value) => {
        return <TagGroup>
            {value && value.map(v => <Tag key={v.start} type="normal" color='orange' onClick={() => showMeetingInfo(v.meetingId)}>{`${v.start} - ${v.end}`}</Tag>)}
        </TagGroup>
    }

    const searchRoom = (v: string) => {
        console.log('v :>> ', v, new Date(v));
        setSearchDate(v);
        getMeetingRoom({ date: new Date(v) })
    }
    return (
        <div>
            <div>
                <h2>会议室预订</h2>
                <Divider></Divider>
            </div>
            <div>
                <DatePicker value={searchDate} onChange={(v) => searchRoom(v as string)}></DatePicker>
                {/* <Button type='primary' onClick={() => searchRoom()}>查询</Button> */}
            </div>
            <div>
                <Box>
                    <Table dataSource={meetingRoomData.list} loading={loading}>
                        <Table.Column key='name' title='会议室' dataIndex='name' cell={(v, index) => <div>{v}<Icon style={{ color: '#1DC11D', marginLeft: '5px', cursor: 'pointer' }} onClick={() => handleDialog(index)} type="help" /></div>} />
                        <Table.Column key='device' title='设备' dataIndex='device' />
                        <Table.Column key='reservedTimeList' title='预订时间' dataIndex='rsvTimeList' cell={(v) => renderReservedTime(v)} />
                        <Table.Column cell={(v, index) => <Button type='secondary' onClick={() => handleRsvDrawer(index)}>立即预订</Button>} />
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
                    <RoomRsvForm roomId={roomInfo.id} roomName={roomInfo.name} date={new Date(searchDate)} meetingInfo={curMeetingInfo}></RoomRsvForm>
                </Drawer>
            </div>

        </div>
    )
}

export default MeetingRoom;