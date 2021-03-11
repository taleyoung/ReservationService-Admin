import React from 'react'
import { useRequest } from 'ice'
import { Form, Input } from '@alifd/next';
import roomInfoService from '@/service/room/meetingRoom'
import { MeetingRoom } from '@/interface/room/meetingRoom';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

interface IProps {
    roomInfo: MeetingRoom;
    isUpdate: boolean;
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
    const { roomInfo, isUpdate } = props;
    const { request: updateRoom, loading: updateLoading } = useRequest(roomInfoService.updateMeetingRoom);
    const { request: addRoom, loading: addLoading } = useRequest(roomInfoService.addMeetingRoom);
    const handleSubmit = async (value: MeetingRoom) => {
        const data = {
            ...value,
            adminId: 1,
            areaId: 1
        }
        if (isUpdate) {
            await updateRoom(roomInfo.id, {
                ...data,
                id: roomInfo.id,
            });
            return;
        }
        addRoom(data);
        return;
    }
    return <div>
        <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
            {formItem.map(item => (
                <FormItem label={item.title} key={item.dataIndex}>
                    <Input defaultValue={isUpdate ? roomInfo[item.dataIndex] : ''} id={item.dataIndex} name={item.dataIndex} />
                </FormItem>
            ))}
            <FormItem wrapperCol={{ offset: 6 }} >
                <Form.Submit loading={isUpdate ? updateLoading : addLoading} validate type="primary" onClick={(v) => handleSubmit(v)} style={{ marginRight: 10 }}>保存</Form.Submit>
            </FormItem>
        </Form>

    </div>
}

export default RoomInfoForm;