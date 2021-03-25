import React, { useState, useEffect } from 'react'
import { Divider, Table, Button, Drawer, Pagination } from '@alifd/next'
import RoomInfoForm from '@/components/RoomInfoForm'

interface IProps {
    tableColumn: any;
    getListService: any;
    deleteService: any;
    addService: any;
    updateService: any;
    addServiceExtraData?: any
}

const BaseCrudTable = (props: IProps) => {
    const { tableColumn, getListService, deleteService, addService, updateService, addServiceExtraData } = props;

    const [hotelInfo, setHotelInfo] = useState();
    const [drawerType, setDrawerType] = useState<string>('edit')
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
    const { data: hotelData = {}, loading, request, refresh } = getListService;
    const { loading: deleteLoading, request: deleteRoomReq } = deleteService;


    useEffect(() => {
        request({});
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

    const deleteRoom = async (record: any) => {
        await deleteRoomReq(record.id);
        await refresh();
    }

    const renderHandle = (v: any, index: number, record: any) => {
        return <div>
            <Button type='secondary' onClick={() => update(index)}>修改</Button>
            <Divider direction='ver'></Divider>
            <Button warning loading={deleteLoading} onClick={() => deleteRoom(record)}>删除</Button>
        </div>
    }

    return (
        <div>
            <Button type='primary' onClick={() => add()}>新增</Button>
            <div>
                <Table dataSource={hotelData.list} loading={loading}>
                    {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)}
                    <Table.Column key='edit' title='操作' dataIndex='edit' cell={(v: any, index: number, record: any) => renderHandle(v, index, record)} />
                </Table>
                <Pagination total={hotelData.totalCount} pageSize={hotelData.pageSize} onChange={(page) => request({ page })} />
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
                    addServiceExtraDate={addServiceExtraData}
                ></RoomInfoForm>
            </Drawer>
        </div>
    )
}

export default BaseCrudTable;