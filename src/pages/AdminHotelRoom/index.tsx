import React from 'react'
import { useRequest, useRouteMatch } from 'ice'
import { Divider } from '@alifd/next'

import { hotelRoomTypeService, hotelService } from '@/service/room'
import BaseCrudTable from '@/components/BaseCrudTable'

const tableColumn = [{
    title: '房型',
    dataIndex: 'name',
    enableEdit: true
}, {
    title: '酒店名称',
    dataIndex: 'hotelName',
    enableEdit: false
}, {
    title: '面积(平方米)',
    dataIndex: 'areaCount',
    enableEdit: true
}, {
    title: '床位',
    dataIndex: 'bedCount',
    enableEdit: true
}, {
    title: '原价',
    dataIndex: 'originalPrice',
    enableEdit: true
}, {
    title: '库存',
    dataIndex: 'wareCount',
    enableEdit: true
}]


const addServiceExtraData = {
    hotelId: 1
}

const AdminHotelRoom = () => {
    const match = useRouteMatch();
    const getListService = useRequest(hotelService.getRoomTypeByHotelId(match.params.id));
    const deleteService = useRequest(hotelRoomTypeService.delete);
    const addService = useRequest(hotelRoomTypeService.add);
    const updateService = useRequest(hotelRoomTypeService.update)

    return <div>
        <div>
            <h2>酒店管理 / 客房管理</h2>
            <Divider></Divider>
        </div>
        <div>
            <BaseCrudTable
                tableColumn={tableColumn}
                addService={addService}
                addServiceExtraData={addServiceExtraData}
                updateService={updateService}
                deleteService={deleteService}
                getListService={getListService}
            ></BaseCrudTable>
            {/* <Table dataSource={hotelRoomData.list} loading={loading}>
                {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)}
                <Table.Column key='edit' title='操作' dataIndex='edit' cell={(v: any, index: number) => renderHandle(v, index)} />
            </Table>
            <Pagination total={hotelRoomData.totalCount} pageSize={hotelRoomData.pageSize} onChange={(curPage) => request(curPage)} /> */}
        </div>
    </div>
}

export default AdminHotelRoom;