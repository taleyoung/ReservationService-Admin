import React from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Pagination, Tag } from '@alifd/next'
import { userService } from '@/service/user'
import { roleEnum, statusEnum } from '@/constant/user'

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

    const renderTableColumn = () => {
        return tableColumn.map(item => {
            if (item.dataIndex === 'status') {
                return <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    cell={(v: number) => <Tag type='normal' color='green'>{statusEnum[v]}</Tag>}
                />
            }
            if (item.dataIndex === 'role') {
                return <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    cell={(v: number) => <Tag type='normal'>{roleEnum[v]}</Tag>}
                />
            }
            return <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />
        })
    }

    return <div>
        <div>
            <h2>会议查询</h2>
            <Divider></Divider>
        </div>
        <div>
            <Table dataSource={userInfoData.list} loading={loading}>
                {renderTableColumn()}
                {/* {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)} */}
            </Table>
            <Pagination style={{ textAlign: 'right', marginTop: '10px' }} total={userInfoData.totalCount} pageSize={userInfoData.pageSize} onChange={(page) => request({ page })} />
        </div>
    </div>
}

export default AdminUser;