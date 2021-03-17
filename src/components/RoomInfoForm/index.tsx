import React from 'react'
import { Form, Input } from '@alifd/next';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
interface IProps {
    roomInfo: any;
    isUpdate: boolean;
    formItem: Item[];
    updateService: any;
    addService: any;
    addServiceExtraDate?: any;
}
interface Item {
    title: string;
    dataIndex: string;
    enableEdit: boolean
}

const RoomInfoForm = (props: IProps) => {
    const { roomInfo, isUpdate, formItem, updateService, addService, addServiceExtraDate } = props;
    const { request: updateRoom, loading: updateLoading } = updateService;
    const { request: addRoom, loading: addLoading } = addService;

    const handleSubmit = async (value) => {
        const data = {
            ...value,
            ...addServiceExtraDate,

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
                item.enableEdit && <FormItem label={item.title} key={item.dataIndex}>
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