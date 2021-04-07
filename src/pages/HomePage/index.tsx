import React, { useEffect } from 'react';
import { useRequest } from 'ice';
import { useCookies } from 'react-cookie'
import { Table, Pagination, Tag, Button } from '@alifd/next'
import NavTitle from '@/components/NavTitle';
import { CheckInStatusEnum, TagColorEnum } from '@/constant'
import { hotelCheckInService } from '@/service/order';

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

const HomePage = () => {
    const { data: checkInData = {}, loading, request } = useRequest(hotelCheckInService.getListByUser);
    const { loading: updateStatusLoading, request: updateStatus } = useRequest(hotelCheckInService.updateStatus);
    // const [cookie] = useCookies()

    useEffect(() => {
        request({})
    }, [])

    const cancelCheckIn = async (v, val, value) => {
        console.log('v', v, val, value)
        await updateStatus(value.orderId, 4);
        await request({});
    }

    const renderTableColumn = () => {
        return tableColumn.map(item => {
            if (item.dataIndex === 'status') {
                return <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    cell={(v: number) => <Tag type='normal' color={TagColorEnum[v]}>{CheckInStatusEnum[v]}</Tag>}
                />
            }
            return <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />
        })
    }

    return <div>
        <NavTitle title='预订过的酒店'></NavTitle>
        <div>
            <Table dataSource={checkInData.list} loading={loading}>
                {renderTableColumn()}
                <Table.Column
                    key='handle'
                    title='操作'
                    dataIndex='handle'
                    cell={(v: number, val, value) => <Button disabled={value.status !== 1} onClick={() => cancelCheckIn(v, val, value)}>取消预订</Button>}
                />
            </Table>
            <Pagination total={checkInData.totalCount} pageSize={checkInData.pageSize} onChange={(curPage) => request(curPage)} />
        </div>
    </div>
}

export default HomePage;