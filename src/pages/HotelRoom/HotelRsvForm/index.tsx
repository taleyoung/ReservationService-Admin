import React, { useState } from 'react'
import { useRequest, useHistory } from 'ice'
import { Form, Input, DatePicker, TimePicker, Radio } from '@alifd/next';
import { useCookies } from 'react-cookie'
import moment, { Moment } from 'moment'
import { hotelOrderService } from '@/service/order/index'

import styles from './index.module.scss'

const nowDate = moment().format("YYYY-MM-DD");
const nextDate = moment().add(1, 'days').format("YYYY-MM-DD");

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
    const history = useHistory();
    const { hotelName, name: hotelRoomTypeName, id: hotelRoomTypeId, originalPrice } = hotelRoomInfo;
    const [startDate, setStartDate] = useState(nowDate);
    const [endDate, setEndDate] = useState(nextDate);
    const { request, loading } = useRequest(hotelOrderService.add);
    const { request: testPayAndSuccess, loading: testPayLoading } = useRequest(hotelOrderService.testPayAndSuccess);
    const { request: testPayAndCancel, loading: testPayAndCancelLoading } = useRequest(hotelOrderService.testPayAndCancel);
    // const { request: payOrder } = useRequest(hotelOrderService.payOrder)
    const [cookie] = useCookies();

    const days = moment(new Date(endDate)).diff(moment(new Date(startDate)), 'day') + 1;

    const submitOrder = async (value, type: string) => {
        const data = {
            ...value,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD'),
            totalPrice: days * originalPrice,
            userId: cookie['userId'],
            userName: cookie['username'],
            hotelRoomTypeId,
            hotelName,
            hotelRoomTypeName,
        }
        if (type === 'testSuccess') {
            await testPayAndSuccess(data);
            history.push('/home');
            return;
        } else if (type === 'testCancel') {
            await testPayAndCancel(data);
            history.push('/home');
            return;
        } else {
            await request(data);
        }

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
                <Input placeholder="请输入身份证号" id="personIdNumber" name="personIdNumber" />
            </FormItem>
            <FormItem label="入住日期:">
                <DatePicker onChange={(v) => setStartDate(v as string)} defaultValue={startDate} format="YYYY-M-D" id='startDate' name="startDate" />
            </FormItem>
            <FormItem label="离开日期:">
                <DatePicker onChange={(v) => setEndDate(v as string)} defaultValue={endDate} format="YYYY-M-D" id='endDate' name="endDate" />
            </FormItem>
            <FormItem label="预计到店时间:">
                <TimePicker id='expectedTime' name="expectedTime" defaultValue="17:00:00" />
            </FormItem>
            <FormItem label="支付平台:" >
                <RadioGroup defaultValue={0} dataSource={radioList} id='payType' name='payType' />
            </FormItem>
            <FormItem label="需支付：">
                <div className={styles.price}>￥<span style={{ fontSize: '20px' }}>{days * originalPrice}</span></div>
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
                {/* <a href="http://localhost:88/api/order/payOrder?orderSn=1234322">支付宝</a> */}
                <Form.Submit loading={loading} validate type="primary" onClick={(v) => submitOrder(v, '')} style={{ marginRight: 10 }}>立即预订</Form.Submit>
                <Form.Submit loading={testPayLoading} validate type="secondary" onClick={(v) => submitOrder(v, 'testSuccess')} style={{ marginRight: 10 }}>测试：预订并支付成功</Form.Submit>
                <Form.Submit loading={testPayAndCancelLoading} validate type="secondary" onClick={(v) => submitOrder(v, 'testCancel')} style={{ marginRight: 10 }}>测试：预订，支付超时</Form.Submit>
            </FormItem>
        </Form>
    </div>
}

export default HotelRsvForm;