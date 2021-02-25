import React, { useState } from 'react';
import { Dialog } from '@alifd/next';

interface IProps {
    dialogShow: boolean;
    data: any;
}
const RoomDialog = (props: IProps) => {
    const { dialogShow, data } = props;
    const [visible, setVisible] = useState<boolean>(false);
    return <Dialog
        title="房间详情"
        visible={visible || dialogShow}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onClose={() => setVisible(false)}>
        详情
    </Dialog>
}

export default RoomDialog;