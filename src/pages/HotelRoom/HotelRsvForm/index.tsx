import React from 'react'
import { useRequest } from 'ice'
import { Form, Input, DatePicker, TimePicker, Radio } from '@alifd/next';
import moment from 'moment'
import { hotelOrderService } from '@/service/order/index'

import styles from './index.module.scss'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const radioList = [
    {
        value: 0,
        label: '支付宝'
    }
];
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

interface IProps {
    hotelRoomInfo: any
}

const HotelRsvForm = (props: IProps) => {
    const { hotelRoomInfo } = props;
    const { hotelName, name: hotelRoomTypeName } = hotelRoomInfo;
    const { request } = useRequest(hotelOrderService.add);

    const submitMeeting = (value) => {
        console.log('value', value);
        const data = {
            ...value,
            userId: 1,
            userName: "滕野",
        }
        request(data);

    }
    return <div>
        <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
            <FormItem label="酒店:">
                <Input disabled={true} value={hotelName} name="hotelName" />
            </FormItem>
            <FormItem required label="房间类型:">
                <Input disabled={true} value={hotelRoomTypeName} id="hotelRoomTypeName" name="hotelRoomTypeName" />
            </FormItem>
            <FormItem label="姓名:">
                <Input placeholder="请输入姓名" id="personName" name="personName" />
            </FormItem>
            <FormItem label="身份证号:">
                <Input placeholder="请输入身份证号" id="personIdNum" name="personIdNum" />
            </FormItem>
            <FormItem label="入职日期:">
                <DatePicker defaultValue={moment()} format="YYYY-M-D" id='startDate' name="startDate" />
            </FormItem>
            <FormItem label="离开日期:">
                <DatePicker defaultValue={moment()} format="YYYY-M-D" id='endDate' name="endDate" />
            </FormItem>
            <FormItem label="预计到店时间:">
                <TimePicker id='expectedTime' name="expectedTime" defaultValue="17:00:00" />
            </FormItem>
            <FormItem label="支付平台:" >
                <RadioGroup defaultValue={0} dataSource={radioList} id='payType' name='payType' />
            </FormItem>
            <FormItem label="需支付：">
                <div className={styles.price}>￥<span style={{ fontSize: '20px' }}>280</span></div>
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
                <Form.Submit validate type="primary" onClick={(v) => submitMeeting(v)} style={{ marginRight: 10 }}>立即预订</Form.Submit>
            </FormItem>
        </Form>
    </div>
}

export default HotelRsvForm;