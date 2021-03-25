import React from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Pagination } from '@alifd/next'
import { userService } from '@/service/user'

const tableColumn = [{
    title: '用户昵称',
    dataIndex: 'username'
}, {
    title: '手机号',
    dataIndex: 'mobile'
}, {
    title: '邮箱',
    dataIndex: 'email'
}, {
    title: '角色',
    dataIndex: 'role'
}, {
    title: "状态",
    dataIndex: 'status'
}, {
    title: "创建时间",
    dataIndex: 'createTime'
}]
const AdminUser = () => {
    const { data: userInfoData = {}, loading, request } = useRequest(userService.getList, {
        manual: false
    });

    return <div>
        <div>
            <h2>会议查询</h2>
            <Divider></Divider>
        </div>
        <div>
            <Table dataSource={userInfoData.list} loading={loading}>
                {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)}
            </Table>
            <Pagination total={userInfoData.totalCount} pageSize={userInfoData.pageSize} onChange={(curPage) => request(curPage)} />
        </div>
    </div>
}

export default AdminUser;