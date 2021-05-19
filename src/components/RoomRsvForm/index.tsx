import React from 'react'
import { useRequest } from 'ice'
import { Form, Input, DatePicker, Radio, TimePicker } from '@alifd/next';
import moment from 'moment'
import meetingService from '@/service/room/meeting'

import { Meeting } from '@/interface/room/meeting'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
const radioList = [
    {
        value: 'one',
        label: '单次'
    }, {
        value: 'repeat',
        label: '每周重复'
    }
];

const formItem = [{
    title: "会议室名称",
    dataIndex: 'meetingRoomName'
}, {
    title: '会议主题',
    dataIndex: 'name'
}, {
    title: '预订日期',
    dataIndex: 'date'
}, {
    title: '开始时间',
    dataIndex: 'start'
}, {
    title: '结束时间',
    dataIndex: 'end'
}, {
    title: '参会人数',
    dataIndex: 'memberCount'
}, {
    title: '创建者',
    dataIndex: 'creatorName'
}]

interface IProps {
    roomId: number;
    roomName: string;
    date: Date;
    meetingInfo?: Meeting;
}

const RoomRsvForm = (props: IProps) => {
    const { roomName, roomId, meetingInfo, date } = props;
    const { request, loading } = useRequest(meetingService.addMeeting);

    const submitMeeting = (value) => {
        console.log('value', value);
        if (value.name === null || value.name === '') {
            return;
        }
        const data = {
            ...value,
            date: value.date.valueOf(),
            creatorId: 1,
            creatorName: "滕野",
            meetingRoomId: roomId,
            meetingRoomName: roomName
        }
        request(data);

    }

    if (meetingInfo) {
        return (
            <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
                {formItem.map(item => (
                    <FormItem label={item.title} key={item.title}>
                        <Input disabled={true} value={meetingInfo[item.dataIndex]} />
                    </FormItem>
                ))}
            </Form>
        )
    }

    return <div>
        <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
            <FormItem label="会议室:">
                <Input disabled={true} value={roomName} />
            </FormItem>
            <FormItem required label="会议主题:">
                <Input placeholder="请输入会议主题" id="name" name="name" />
            </FormItem>
            <FormItem label="预订日期:">
                <DatePicker defaultValue={moment()} format="YYYY-M-D" id='date' name="date" />
            </FormItem>
            <FormItem label="预订时间段:">
                起始：<TimePicker id='start' name="start" defaultValue="11:00:00" /><br /><br />
                中止：<TimePicker id='end' name="end" defaultValue="12:00:00" />
            </FormItem>
            {/* <FormItem label="重复类型:">
                <RadioGroup dataSource={radioList} id='isReapted' name='isReapted' />
            </FormItem> */}
            <FormItem label="参会人数:">
                <Input placeholder="请输入参会人数" id="memberCount" name="memberCount" />
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
                <Form.Submit validate loading={loading} type="primary" onClick={(v) => submitMeeting(v)} style={{ marginRight: 10 }}>立即预订</Form.Submit>
            </FormItem>
        </Form>

    </div>
}

export default RoomRsvForm;