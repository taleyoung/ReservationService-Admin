import React from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Button, Drawer, Pagination } from '@alifd/next'
import meetingService from '@/service/room/meeting'

const tableColumn = [{
    title: '会议主题',
    dataIndex: 'name'
}, {
    title: '会议日期',
    dataIndex: 'capacity'
}, {
    title: '开始时间',
    dataIndex: 'start'
}, {
    title: "结束时间",
    dataIndex: 'end'
}, {
    title: "创建者",
    dataIndex: 'creatorId'
}, {
    title: "会议人数",
    dataIndex: 'memberCount'
}, {
    title: "创建时间",
    dataIndex: 'createTime'
}]
const AdminMeeting = () => {
    const { data: roomInfoData = {}, loading, request, refresh } = useRequest(meetingService.getMeeting, {
        manual: false
    });

    return <div>
        <div>
            <h2>会议查询</h2>
            <Divider></Divider>
        </div>
        <div>
            <Table dataSource={roomInfoData.list} loading={loading}>
                {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)}
            </Table>
            <Pagination total={roomInfoData.totalCount} pageSize={roomInfoData.pageSize} onChange={(curPage) => request(curPage)} />
        </div>
    </div>
}

export default AdminMeeting;