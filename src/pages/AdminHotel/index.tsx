import React, { useState, useEffect } from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Button, Drawer, Pagination } from '@alifd/next'
import { hotelService } from '@/service/room'
import RoomInfoForm from '@/components/RoomInfoForm'
import { Hotel } from '@/interface/room/hotel'

const tableColumn = [{
    title: '酒店',
    dataIndex: 'name'
}, {
    title: '酒店评分',
    dataIndex: 'score'
}, {
    title: '位置',
    dataIndex: 'location'
}, {
    title: '描述',
    dataIndex: 'description'
}]
const AdminHotel = () => {
    const [hotelInfo, setHotelInfo] = useState();
    const [drawerType, setDrawerType] = useState<string>('edit')
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
    const { data: hotelData = {}, loading, request, refresh } = useRequest(hotelService.getList);
    const { loading: deleteLoading, request: deleteRoomReq } = useRequest(hotelService.delete);
    const addService = useRequest(hotelService.add);
    const updateService = useRequest(hotelService.update)

    useEffect(() => {
        request();
    }, [])

    const add = () => {
        setDrawerType('add');
        setDrawerVisible(true);
    }

    const update = (index: number) => {
        setHotelInfo(hotelData.list[index]);
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
            <Button type='secondary' onClick={() => update(index)}>修改</Button>
            <Divider direction='ver'></Divider>
            <Button warning loading={deleteLoading} onClick={() => deleteRoom(index)}>删除</Button>
        </div>
    }

    return (
        <div>
            <div>
                <h2>酒店管理</h2>
                <Divider></Divider>
            </div>
            <Button type='primary' onClick={() => add()}>新增酒店</Button>
            <div>
                <Table dataSource={hotelData.list} loading={loading}>
                    {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)}
                    <Table.Column key='edit' title='操作' dataIndex='edit' cell={(v: any, index: number) => renderHandle(v, index)} />
                </Table>
                <Pagination total={hotelData.totalCount} pageSize={hotelData.pageSize} onChange={(curPage) => request(curPage)} />
            </div>
            <Drawer title="编辑酒店"
                placement="right"
                width='600px'
                visible={drawerVisible}
                onClose={() => handleCloseDrawer()}>
                <RoomInfoForm
                    isUpdate={drawerType === 'update' ? true : false}
                    roomInfo={hotelInfo}
                    formItem={tableColumn}
                    updateService={updateService}
                    addService={addService}
                ></RoomInfoForm>
            </Drawer>
        </div>
    )
}

export default AdminHotel;