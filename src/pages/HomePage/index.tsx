import React, { useEffect } from 'react';
import { useRequest } from 'ice';
import { useCookies } from 'react-cookie'
import { Table, Pagination, Tag } from '@alifd/next'
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
    const { data: checkInData = {}, loading, request } = useRequest(hotelCheckInService.getList);
    const [cookie] = useCookies()

    useEffect(() => {
        request({ userId: cookie['userId'] })
    }, [])

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
            </Table>
            <Pagination total={checkInData.totalCount} pageSize={checkInData.pageSize} onChange={(curPage) => request(curPage)} />
        </div>
    </div>
}

export default HomePage;