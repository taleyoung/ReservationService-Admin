import React from 'react'
import { Form, Input, DatePicker, Radio } from '@alifd/next';
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

interface IProps {
    roomName: string
}

const RoomRsvForm = (props: IProps) => {
    const { roomName } = props;
    return <div>
        <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
            <FormItem label="会议室:">
                <Input disabled={true} value={roomName} />
            </FormItem>
            <FormItem required label="会议主题:">
                <Input placeholder="请输入会议主题" id="meetName" name="meetingName" />
            </FormItem>
            <FormItem label="预订日期:">
                <DatePicker id='meetDate' name="meetDate" />
            </FormItem>
            <FormItem label="预订时间段:">
                <Input placeholder="请输入会议主题" id="id='meetTime" name="meetTime" />
            </FormItem>
            <FormItem label="重复类型:">
                <RadioGroup dataSource={radioList} id='isReapted' name='isReapted' />
            </FormItem>
            <FormItem label="参会人数:">
                <Input placeholder="请输入参会人数" id="meetCount" name="meetCount" />
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
                <Form.Submit validate type="primary" onClick={(v, e) => console.log(v, e)} style={{ marginRight: 10 }}>立即预订</Form.Submit>
                <Form.Reset >Reset</Form.Reset>
            </FormItem>
        </Form>

    </div>
}

export default RoomRsvForm;