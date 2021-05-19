import React from 'react';
import { Divider, Calendar, Grid } from '@alifd/next';
import styles from './index.module.scss'
import meetingRoomImg from '../../assets/images/meetingRoom-01.jpg'
import { MeetingRoom } from '../../interface/room/meetingRoom'
import moment from 'moment';
moment.locale('zh-cn');

const { Row, Col } = Grid;

interface IProp {
    roomInfo: MeetingRoom
}

const roomInfoMap = [
    {
        name: '设备',
        key: 'device'
    }, {
        name: "描述",
        key: 'description'
    }, {
        name: "位置",
        key: "location"
    }, {
        name: "可容纳人数",
        key: "capacity"
    }, {
        name: "所在区域",
        key: "areaName"
    }
]

const dateCellRender = (date) => {
    const currentDate = moment();
    const dateNum = date.date();
    if (currentDate.month() !== date.month()) {
        return dateNum;
    }

    let eventList;
    switch (dateNum) {
        case 1:
            eventList = [
                { type: 'normal', content: '9：00 - 11：00' },
                { type: 'primary', content: '14：00 - 15：30' }
            ];
            break;
        case 10:
            eventList = [
                { type: 'normal', content: '9：00 - 11：00' },
                { type: 'normal', content: '14：00 - 15：30' },
                { type: 'normal', content: '16：00 - 16：30' }
            ];
            break;
        case 11:
            eventList = [
                { type: 'primary', content: '16：00 - 16：30' },
                { type: 'primary', content: '17：40 - 18：30' }
            ];
            break;
        default:
            eventList = [];
    }

    return (<div className={styles['custom-calendar-cell']}>
        <div className={styles['custom-calendar-cell-value']}>{dateNum}</div>
        <div className={styles['custom-calendar-cell-content']}>
            <ul className={styles['event-list']}>
                {eventList.map((item, key) => <li className={styles[`${item.type}-event`]} key={key}>{item.content}</li>)}
            </ul>
        </div>
    </div>);
}
const RoomDialog = (props: IProp) => {
    const { roomInfo } = props;
    return (
        <div>
            <Row justify="center" align='center' style={{ width: '1000px' }}>
                <Col span='10'><img className={styles.img} src={meetingRoomImg} alt="" /></Col>
                <Col span='8'>
                    <div className={styles.name}>{roomInfo.name}</div>
                    {roomInfoMap.map(item => (<div key={item.key} className={styles.desc}>{item.name} : {roomInfo[item.key]}</div>))}
                </Col>
            </Row>
            {/* <div className={styles.calendar}>
                <Calendar dateCellRender={dateCellRender} />
            </div> */}

        </div>
    )
}

export default RoomDialog;