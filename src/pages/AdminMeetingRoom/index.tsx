import React, { useState, useEffect } from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Button, Drawer, Pagination } from '@alifd/next'
import meetingRoomService from '@/service/room/meetingRoom'
import { MeetingRoom } from '@/interface/room/meetingRoom'
import RoomInfoForm from '@/components/RoomInfoForm'

const defaultRoomInfo: MeetingRoom = {
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
    status: 1
}
const tableColumn = [{
    title: '会议室',
    dataIndex: 'name'
}, {
    title: '容纳人数',
    dataIndex: 'capacity'
}, {
    title: '设备',
    dataIndex: 'device'
}, {
    title: '描述',
    dataIndex: 'description'
}, {
    title: '位置',
    dataIndex: 'location'
}, {
    title: '所在区域',
    dataIndex: 'areaName'
}, {
    title: '状态',
    dataIndex: 'status'
}]
const AdminMeetingRoom = () => {
    const [roomInfo, setRoomInfo] = useState<MeetingRoom>(defaultRoomInfo)
    const [drawerType, setDrawerType] = useState<string>('edit')
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
    const { data: roomInfoData = {}, loading, request, refresh } = useRequest(meetingRoomService.getMeetingRoom);
    const { loading: deleteLoading, request: deleteRoomReq } = useRequest(meetingRoomService.deleteMeetingRoom);
    const updateMeetingRoomService = useRequest(meetingRoomService.updateMeetingRoom);
    const addMeetingRoomService = useRequest(meetingRoomService.addMeetingRoom);

    useEffect(() => {
        request({});
    }, [])

    const addRoom = () => {
        setDrawerType('add');
        setDrawerVisible(true);
    }

    const updateRoom = (index: number) => {
        setRoomInfo(roomInfoData.list[index]);
        setDrawerType('update');
        setDrawerVisible(true);
    }

    const handleCloseDrawer = () => {
        setDrawerVisible(false);
        refresh();
    }

    const deleteRoom = async (id: number) => {
        await deleteRoomReq(id);
        await refresh()
    }

    const renderHandle = (v: any, index: number) => {
        return <div>
            <Button type='secondary' onClick={() => updateRoom(index)}>修改</Button>
            <Divider direction='ver'></Divider>
            <Button warning loading={deleteLoading} onClick={() => deleteRoom(index)}>删除</Button>
        </div>
    }

    return (
        <div>
            <div>
                <h2>会议室管理</h2>
                <Divider></Divider>
            </div>
            <Button type='primary' onClick={() => addRoom()}>新增会议室</Button>
            <div>
                <Table dataSource={roomInfoData.list} loading={loading}>
                    {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)}
                    <Table.Column key='edit' title='操作' dataIndex='edit' cell={(v: any, index: number) => renderHandle(v, index)} />
                </Table>
                <Pagination total={roomInfoData.totalCount} pageSize={roomInfoData.pageSize} onChange={(curPage) => request({ curPage })} />
            </div>
            <Drawer title="编辑会议室"
                placement="right"
                width='600px'
                visible={drawerVisible}
                onClose={() => handleCloseDrawer()}>
                <RoomInfoForm
                    isUpdate={drawerType === 'update' ? true : false}
                    roomInfo={roomInfo}
                    formItem={tableColumn}
                    updateService={updateMeetingRoomService}
                    addService={addMeetingRoomService}
                ></RoomInfoForm>
            </Drawer>
        </div>
    )
}

export default AdminMeetingRoom;