import React, { useState, useEffect } from 'react'
import { useRequest } from 'ice'
import { Divider, Table, Pagination, Form, Input, DatePicker, Button } from '@alifd/next'
import meetingService from '@/service/room/meeting'

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

const tableColumn = [{
    title: '会议主题',
    dataIndex: 'name',
    enableQuery: true
}, {
    title: '会议日期',
    dataIndex: 'date',
    enableQuery: true
}, {
    title: '会议室',
    dataIndex: 'meetingRoomId',
    enableQuery: true
}, {
    title: '开始时间',
    dataIndex: 'start',
    enableQuery: false
}, {
    title: "结束时间",
    dataIndex: 'end',
    enableQuery: false
}, {
    title: "创建者",
    dataIndex: 'creatorId',
    enableQuery: true
}, {
    title: "会议人数",
    dataIndex: 'memberCount',
    enableQuery: true
}, {
    title: "创建时间",
    dataIndex: 'createTime',
    enableQuery: false
}]
const defaultData = {
    list: [],
    totalCount: 1,
    pageSize: 0
}
const AdminMeeting = () => {
    const { data, loading, request: getListReq } = useRequest(meetingService.getMeetingList, {
        manual: false
    });
    const [meetingData, setMeetingData] = useState(defaultData);


    useEffect(() => {
        if (data) {
            setMeetingData(data);
        }
    }, [data])

    const formQuery = async (v) => {
        const res = await getListReq(v);
        setMeetingData(res);
    }

    return <div>
        <div>
            <h2>会议查询</h2>
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
                    return null;
                })}
                <FormItem colSpan={6} label='会议日期'>
                    <DatePicker format="YYYY-M-D" id='date' name="date" />
                </FormItem>
                <FormItem wrapperCol={{ offset: 1 }} label="" colSpan={12} >
                    <Form.Submit validate type="primary" onClick={(v) => formQuery(v)} style={{ marginRight: 10 }}>查询</Form.Submit>
                    <Form.Reset type="secondary" onClick={() => formQuery({})} style={{ marginRight: 10 }}>重置</Form.Reset>
                </FormItem>
            </Form>
        </div>
        <div>
            <Table dataSource={meetingData.list || []} loading={loading}>
                {tableColumn.map(item => <Table.Column key={item.dataIndex} title={item.title} dataIndex={item.dataIndex} />)}
            </Table>
            <Pagination style={{ textAlign: 'right', marginTop: '10px' }} total={meetingData.totalCount} pageSize={meetingData.pageSize} onChange={(curPage) => getListReq(curPage)} />
        </div>
    </div>
}

export default AdminMeeting;