import React from 'react'
import { useRequest } from 'ice'
import { Form, Input } from '@alifd/next';
import roomInfoService from '@/service/room'
import { RoomInfo } from '@/interface/room';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

interface IProps {
    roomInfo: RoomInfo
}
const formItem = [{
    title: '会议室',
    dataIndex: 'name'
}, {
    title: '容纳人数',
    dataIndex: 'capacity'
}, {
    title: '设备',
    dataIndex: 'device'
}, {
    title: '描述',
    dataIndex: 'description'
}, {
    title: '位置',
    dataIndex: 'location'
}, {
    title: '所在区域',
    key: 'areaName',
    dataIndex: 'areaName'
}, {
    title: '状态',
    dataIndex: 'status'
}]
const RoomInfoForm = (props: IProps) => {
    const { roomInfo } = props;
    const { data, request, loading: updateLoading } = useRequest(roomInfoService.updateRoomInfo);

    const handleSubmit = async (value: RoomInfo) => {
        console.log('value, e', value)
        const data = {
            ...value,
            id: roomInfo.id,
            adminId: 1,
            areaId: 1
        }
        console.log('data', data)
        await request(roomInfo.id, data);
    }
    return <div>
        <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
            {formItem.map(item => (
                <FormItem label={item.title} key={item.dataIndex}>
                    <Input defaultValue={roomInfo[item.dataIndex]} id={item.dataIndex} name={item.dataIndex} />
                </FormItem>
            ))}
            <FormItem wrapperCol={{ offset: 6 }} >
                <Form.Submit loading={updateLoading} validate type="primary" onClick={(v) => handleSubmit(v)} style={{ marginRight: 10 }}>保存</Form.Submit>
            </FormItem>
        </Form>

    </div>
}

export default RoomInfoForm;