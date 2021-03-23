import React, { useState, useEffect } from 'react'
import { useRequest } from 'ice'
import { hotelCheckInService } from '@/service/order'
import { Divider, Table, Tag, Pagination, Button, Step, Balloon } from '@alifd/next'
import { CheckInStatusEnum, TagColorEnum } from '@/constant'
import { IPageData } from '@/interface'


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

const stepItem = ['待付款', '待入住', '已入住', '已退房'];
const defaultData = {
    list: [],
    totalCount: 1,
    pageSize: 0
}

const AdminCheckIn = () => {
    const { data, request, loading } = useRequest(hotelCheckInService.getList, {
        manual: false
    })
    const { request: updateStatusService, loading: updateLoading } = useRequest(hotelCheckInService.updateStatus)
    const [checkInData, setCheckInData] = useState<IPageData>(defaultData);

    useEffect(() => {
        if (data) {
            setCheckInData(data);
        }
    }, [data])

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

    const updateStatus = async (record, index) => {
        const updateRes = await updateStatusService(record.orderId, index);
        console.log('updateRes', updateRes)
        const res = await request();
        if (res.code === 0) {
            setCheckInData(res.data)
        }
        // if (updateRes.code === 0) {
        //     const res = await request();
        //     if (res.code === 0) {
        //         setCheckInData(res.data)
        //     }
        // }

    }

    const renderChangeStatus = (v, idx, record) => {
        return <Balloon trigger={<Button>更改</Button>} triggerType="hover">
            <Step current={v} shape="circle">
                {stepItem.map((item, index) => <Step.Item disabled={index < v} onClick={() => updateStatus(record, index)} key={item} title={item} />)}
            </Step>
        </Balloon>
    }
    return <div>
        <div>
            <h2>客房登记查询</h2>
            <Divider></Divider>
        </div>
        <div>
            <Table dataSource={checkInData.list} loading={loading && updateLoading}>
                {renderTableColumn()}
                <Table.Column key='status' dataIndex='status' title='操作' cell={(v, index, record) => renderChangeStatus(v, index, record)} />
            </Table>
            <Pagination total={checkInData.totalCount} pageSize={checkInData.pageSize} onChange={(curPage) => request(curPage)} />
        </div>
    </div>
}

export default AdminCheckIn