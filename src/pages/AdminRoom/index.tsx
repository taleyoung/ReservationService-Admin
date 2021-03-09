import React, { useState } from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Button, Drawer } from '@alifd/next'
import roomInfoService from '@/service/room'
import { RoomInfo } from '@/interface/room'
import RoomInfoForm from '@/components/RoomInfoForm'

const defaultRoomInfo: RoomInfo = {
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
    key: 'name',
    dataIndex: 'name'
}, {
    title: '容纳人数',
    key: 'capacity',
    dataIndex: 'capacity'
}, {
    title: '设备',
    key: 'device',
    dataIndex: 'device'
}, {
    title: '描述',
    key: 'description',
    dataIndex: 'description'
}, {
    title: '位置',
    key: 'location',
    dataIndex: 'location'
}, {
    title: '所在区域',
    key: 'areaName',
    dataIndex: 'areaName'
}, {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
}]
const AdminRoom = () => {
    const [roomInfo, setRoomInfo] = useState<RoomInfo>(defaultRoomInfo)
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
    const { data: roomInfoList = [], error, loading } = useRequest(roomInfoService.getRoomInfo, {
        manual: false
    });

    const handleShowDrawer = (index: number) => {
        setRoomInfo(roomInfoList[index])
        setDrawerVisible(true)
    }

    const renderHandle = (v: any, index: number) => {
        return <div>
            <Button type='secondary' onClick={() => handleShowDrawer(index)}>修改</Button>
            <Divider direction='ver'></Divider>
            <Button type='secondary' onClick={() => handleShowDrawer(index)}>删除</Button>
        </div>
    }

    return (
        <div>
            <div>
                <h2>会议室管理</h2>
                <Divider></Divider>
            </div>
            <Button type='primary'>新增会议室</Button>
            <div>
                <Table dataSource={roomInfoList} loading={loading}>
                    {tableColumn.map(item => <Table.Column key={item.key} title={item.title} dataIndex={item.dataIndex} />)}
                    <Table.Column key='edit' title='操作' dataIndex='edit' cell={(v: any, index: number) => renderHandle(v, index)} />
                </Table>
            </div>
            <Drawer title="编辑会议室"
                placement="right"
                width='600px'
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}>
                <RoomInfoForm roomInfo={roomInfo}></RoomInfoForm>
            </Drawer>
        </div>
    )
}

export default AdminRoom;