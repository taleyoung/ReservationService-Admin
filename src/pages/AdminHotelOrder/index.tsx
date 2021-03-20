import React from 'react'
import { useRequest } from 'ice'
import { hotelOrderService } from '@/service/order'
import { Divider, Table, Pagination, Tag } from '@alifd/next'
import { OrderStatusEnum, TagColorEnum } from '@/constant'

const tableColumn = [
    {
        title: '酒店',
        dataIndex: 'hotelName'
    }, {
        title: '房间',
        dataIndex: 'hotelRoomTypeName'
    }, {
        title: '订单人',
        dataIndex: 'userName'
    }, {
        title: '支付方式',
        dataIndex: 'payType'
    }, {
        title: '支付总额',
        dataIndex: 'totalPrice'
    }, {
        title: '入住时间',
        dataIndex: 'startDate'
    }, {
        title: '离店时间',
        dataIndex: 'endDate'
    }, {
        title: '创建时间',
        dataIndex: 'createTime'
    }, {
        title: '当前状态',
        dataIndex: 'status'
    }
]
const AdminHotelOrder = () => {
    const { data: orderData, request, loading } = useRequest(hotelOrderService.getList, {
        manual: false
    })
    const { list = [], totalCount = 1, pageSize = 0 } = orderData || {};

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
            <h2>订单查询</h2>
            <Divider></Divider>
        </div>
        <div>
            <Table dataSource={list} loading={loading}>
                {renderTableColumn()}
                {/* {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)} */}
            </Table>
            <Pagination total={totalCount} pageSize={pageSize} onChange={(curPage) => request(curPage)} />
        </div>
    </div>
}

export default AdminHotelOrder