import React from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Pagination, Tag, Button } from '@alifd/next'
import { optLogService } from '@/service/user'

const tableColumn = [{
    title: '序号',
    dataIndex: 'id'
}, {
    title: '模块',
    dataIndex: 'module'
}, {
    title: '操作',
    dataIndex: 'type'
}, {
    title: '描述',
    dataIndex: 'description'
}, {
    title: '用户',
    dataIndex: 'userName'
}, {
    title: "结果",
    dataIndex: 'result'
}, {
    title: "时间",
    dataIndex: 'optTime'
}]
const AdminOptLog = () => {
    const { data = {}, loading, request } = useRequest(optLogService.getList, {
        manual: false
    });

    const renderTableColumn = () => {
        return tableColumn.map(item => {

            if (item.dataIndex === 'module') {
                return <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    cell={(v: number) => <Tag type='normal' color='blue'>{v}</Tag>}
                />
            }
            if (item.dataIndex === 'type') {
                return <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    cell={(v) => <Tag type='primary' color='orange'>{v}</Tag>}
                />
            }
            if (item.dataIndex === 'userName') {
                return <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    cell={(v) => <Tag type='normal'>{v}</Tag>}
                />
            }
            return <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />
        })
    }

    return <div>
        <div>
            <h2>用户操作留痕</h2>
            <Divider></Divider>
        </div>
        <div>
            <Table dataSource={data.list} loading={loading}>
                {renderTableColumn()}
                <Table.Column
                    key='handle'
                    title='操作'
                    dataIndex='handle'
                    cell={(v) => <Button type='normal'>详情</Button>}
                />
                {/* {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)} */}
            </Table>
            <Pagination style={{ textAlign: 'right', marginTop: '10px' }} total={data.totalCount} pageSize={data.pageSize} onChange={(page) => request({ page })} />
        </div>
    </div>
}

export default AdminOptLog;