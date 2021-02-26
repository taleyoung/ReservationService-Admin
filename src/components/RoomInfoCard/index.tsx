import React from 'react';
import { Divider, Calendar, Grid } from '@alifd/next';
import styles from './index.module.scss'
import meetingRoomImg from '../../assets/images/meetingRoom-01.jpg'
import moment from 'moment';
moment.locale('zh-cn');

const { Row, Col } = Grid;
interface IProps {
    name: string,
    desc: string,
    image: string,
    usedTime: string
}
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
const RoomDialog = (props: IProps) => {
    const { name, desc, image, usedTime } = props;
    return (
        <div>
            <Row justify="center" align='center' style={{ width: '1000px' }}>
                <Col span='10'><img className={styles.img} src={meetingRoomImg} alt="" /></Col>
                <Col span='8'>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.desc}>{desc}</div>
                </Col>
            </Row>
            <div className={styles.calendar}>
                <Calendar dateCellRender={dateCellRender} />
            </div>

        </div>
    )
}

export default RoomDialog;