import React from 'react'
import { useRequest } from 'ice'
import { hotelCheckInService } from '@/service/order'
import { Divider, Table, Tag, Pagination } from '@alifd/next'
import { OrderStatusEnum, TagColorEnum } from '@/constant'


const tableColumn = [
    {
        title: '房间号',
        dataIndex: 'hotelRoomNum'
    }, {
        title: '酒店',
        dataIndex: 'hotelName'
    }, {
        title: '客房类型',
        dataIndex: 'hotelRoomTypeName'
    }, {
        title: '预订人',
        dataIndex: 'userName'
    }, {
        title: '入住人',
        dataIndex: 'personName'
    }, {
        title: '入住人身份证号',
        dataIndex: 'personIdNumber'
    }, {
        title: '日期',
        dataIndex: 'date'
    }, {
        title: '预计到店时间',
        dataIndex: 'expectedTime'
    }, {
        title: '状态',
        dataIndex: 'status'
    }
]
const AdminCheckIn = () => {
    const { data: checkInData, request, loading } = useRequest(hotelCheckInService.getList, {
        manual: false
    })
    const { list = [], totalCount = 1, pageSize = 0 } = checkInData || {};

    const renderTableColumn = () => {
        return tableColumn.map(item => {
            if (item.dataIndex === 'status') {
                return <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    cell={(v: number) => <Tag type='normal' color={TagColorEnum[v]}>{OrderStatusEnum[v]}</Tag>}
                />
            }
            return <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />
        })
    }
    return <div>
        <div>
            <h2>客房登记查询</h2>
            <Divider></Divider>
        </div>
        <div>
            <Table dataSource={list} loading={loading}>
                {renderTableColumn()}
            </Table>
            <Pagination total={totalCount} pageSize={pageSize} onChange={(curPage) => request(curPage)} />
        </div>
    </div>
}

export default AdminCheckIn