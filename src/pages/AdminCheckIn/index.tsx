import React, { useState, useEffect } from 'react'
import { useRequest } from 'ice'
import ExportJsonExcel from 'js-export-excel';
import { hotelCheckInService } from '@/service/order'
import { Divider, Table, Tag, Pagination, Button, Step, Balloon, Form, Input, DatePicker } from '@alifd/next'
import { CheckInStatusEnum, TagColorEnum } from '@/constant'
import { IPageData } from '@/interface'

const FormItem = Form.Item;
const style = {
    padding: '20px',
    background: '#F7F8FA',
    // margin: '20px'
    width: '80%'
};
const formItemLayout = {
    // labelWidth: 80,
    colSpan: 3,
};
const tableColumn = [
    {
        title: '房间号',
        dataIndex: 'hotelRoomNum',
        enableQuery: true
    }, {
        title: '酒店',
        dataIndex: 'hotelName',
        enableQuery: true
    }, {
        title: '客房类型',
        dataIndex: 'hotelRoomTypeName',
        enableQuery: true
    }, {
        title: '预订人',
        dataIndex: 'userName',
        enableQuery: true
    }, {
        title: '入住人',
        dataIndex: 'personName',
        enableQuery: true
    }, {
        title: '入住人身份证号',
        dataIndex: 'personIdNumber',
        enableQuery: true
    }, {
        title: '日期',
        dataIndex: 'date',
        enableQuery: true
    }, {
        title: '预计到店时间',
        dataIndex: 'expectedTime',
        enableQuery: true
    }, {
        title: '状态',
        dataIndex: 'status',
        enableQuery: false
    }
]

const stepItem = ['待付款', '待入住', '已入住', '已退房'];
const defaultData = {
    list: [],
    totalCount: 1,
    pageSize: 0
}

const AdminCheckIn = () => {
    const { data, request: getListReq, loading } = useRequest(hotelCheckInService.getList, {
        manual: false
    })
    const { request: updateStatusService, loading: updateLoading } = useRequest(hotelCheckInService.updateStatus)
    const [checkInData, setCheckInData] = useState<IPageData>(defaultData);

    useEffect(() => {
        if (data) {
            setCheckInData(data);
        }
    }, [data])

    const formQuery = async (v) => {
        const params = {};
        console.log('v', v)
        Object.keys(v).forEach(key => {
            if (v[key] !== '') {
                params[key] = v[key];
            }
        })
        console.log('v[\'startDate\']', v['startDate'])
        if (v['startDate'] !== undefined) {
            params['startDate'] = new Date(v['startDate']);
        }
        if (v['endDate'] !== undefined) {
            params['endDate'] = new Date(v['endDate']);
        }
        console.log('params', params);
        const res = await getListReq(params);
        console.log('res', res);
        setCheckInData(res);
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

    const updateStatus = async (record, index) => {
        await updateStatusService(record.orderId, index);
        const res = await getListReq({});
        if (res.code === 0) {
            setCheckInData(res.data)
        }

    }

    const renderChangeStatus = (v, idx, record) => {
        return <Balloon trigger={<Button>更改</Button>} triggerType="hover">
            <Step current={v} shape="circle">
                {stepItem.map((item, index) => <Step.Item disabled={index < v ? true : false} onClick={() => updateStatus(record, index)} key={item} title={item} />)}
            </Step>
        </Balloon>
    }
    return <div>
        <div>
            <h2>客房登记查询</h2>
            <Divider></Divider>
        </div>
        <div>
            <Form style={style} responsive>
                {tableColumn.map(item => {
                    if (item.enableQuery) {
                        return <FormItem {...formItemLayout} label={item.title}>
                            <Input placeholder="" id={item.dataIndex} name={item.dataIndex} />
                        </FormItem>
                    }
                    return null
                })}
                <FormItem colSpan={6} label="查询起始日期:">
                    <DatePicker format="YYYY-M-D" id='startDate' name="startDate" />
                </FormItem>
                <FormItem colSpan={6} label="查询结束日期:">
                    <DatePicker format="YYYY-M-D" id='endDate' name="endDate" />
                </FormItem>
                <FormItem wrapperCol={{ offset: 1 }} label="" colSpan={12} >
                    <Form.Submit validate type="primary" onClick={(v) => formQuery(v)} style={{ marginRight: 10 }}>查询</Form.Submit>
                    <Form.Reset type="secondary" onClick={() => formQuery({})} style={{ marginRight: 10 }}>重置</Form.Reset>
                    <Button type='secondary' onClick={() => downloadExcel(checkInData.list)}>导出excel</Button>
                </FormItem>
            </Form>
        </div>
        <div>
            <Table dataSource={checkInData.list} loading={loading || updateLoading}>
                {renderTableColumn()}
                <Table.Column key='status' dataIndex='status' title='操作' cell={(v, index, record) => renderChangeStatus(v, index, record)} />
            </Table>
            <Pagination style={{ textAlign: 'right', marginTop: '10px' }} total={checkInData.totalCount} pageSize={checkInData.pageSize} onChange={(page) => getListReq({ page })} />
        </div>
    </div >
}


function downloadExcel(data) {
    var option: any = {};
    let dataTable: any = [];
    const sheetHeader = tableColumn.map(item => item.title);
    for (let i in data) {
        const perData = {};
        tableColumn.forEach(item => {
            perData[item.title] = data[i][item.dataIndex];
        })
        dataTable.push(perData);
    }
    option.fileName = '订单信息'
    option.datas = [
        {
            sheetData: dataTable,
            sheetName: '客房登记信息',
            sheetFilter: sheetHeader,
            sheetHeader,
        }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
}

export default AdminCheckIn