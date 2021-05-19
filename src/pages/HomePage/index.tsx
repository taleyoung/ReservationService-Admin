import React, { useEffect } from 'react';
import { useRequest } from 'ice';
import { useCookies } from 'react-cookie'
import { Table, Pagination, Tag, Button } from '@alifd/next'
import NavTitle from '@/components/NavTitle';
import { CheckInStatusEnum, TagColorEnum } from '@/constant'
import { hotelCheckInService } from '@/service/order';
import meetingService from '@/service/room/meeting'

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
];
const meetingTableColumn = [{
    title: '会议主题',
    dataIndex: 'name',
}, {
    title: '会议日期',
    dataIndex: 'date',
}, {
    title: '会议室',
    dataIndex: 'meetingRoomId',
}, {
    title: '开始时间',
    dataIndex: 'start',
}, {
    title: "结束时间",
    dataIndex: 'end',
}, {
    title: "创建者",
    dataIndex: 'creatorId',
}, {
    title: "会议人数",
    dataIndex: 'memberCount',
}, {
    title: "创建时间",
    dataIndex: 'createTime',
}];

const HomePage = () => {
    const { data: checkInData = {}, loading, request } = useRequest(hotelCheckInService.getListByUser);
    const { loading: updateStatusLoading, request: updateStatus } = useRequest(hotelCheckInService.updateStatus);
    // const [cookie] = useCookies()
    const { data: meetingData = {}, loading: meetingLoading, request: getMeetingList } = useRequest(meetingService.getMeetingList, {
        manual: false
    });

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
            <Pagination style={{ textAlign: 'right', marginTop: '10px' }} total={checkInData.totalCount} pageSize={checkInData.pageSize} onChange={(curPage) => request(curPage)} />
        </div>
        <NavTitle title='预订过的会议'></NavTitle>
        <div>
            <Table dataSource={meetingData.list} loading={meetingLoading}>
                {meetingTableColumn.map(item => (
                    <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />
                ))}
            </Table>
            <Pagination style={{ textAlign: 'right', marginTop: '10px' }} total={meetingData.totalCount} pageSize={meetingData.pageSize} onChange={(curPage) => getMeetingList(curPage)} />
        </div>
    </div>
}

export default HomePage;