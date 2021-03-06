import React, { useEffect, useState } from 'react'
import { useParams, useRequest } from 'ice'
import moment from 'moment'

import { Divider, Loading, Slider, ResponsiveGrid, Tab, List, Drawer, Grid, Button, DatePicker } from '@alifd/next';
import { hotelService } from '@/service/room'
import hotelDeafultImg from '@/assets/images/hotel.jpg'
import hotelRoomImg01 from '@/assets/images/hotelRoom01.jpeg'
import hotelRoomImg02 from '@/assets/images/hotelRoom02.jpeg'
import hotelRoomImg03 from '@/assets/images/hotelRoom03.jpeg'
import hotelRoomImg04 from '@/assets/images/hotelRoom04.jpeg'

import HotelInfo from './HotelInfo'
import HotelRsvForm from './HotelRsvForm'
import styles from './index.module.scss'

const nowDate = moment().format("YYYY-MM-DD")
const { Cell } = ResponsiveGrid;
const { Row, Col } = Grid;
const { Item: ListItem } = List;
const { Item: TabItem } = Tab;

const slides = [
    hotelRoomImg01, hotelRoomImg02, hotelRoomImg03, hotelRoomImg04
];

const sliderNodes = slides.map((item, index) => <div key={index} className={styles['slider-img-wrapper']}><img className={styles['slider-img']} draggable={false} src={item} alt='' /></div>);

const HotelRoom = () => {
    const params = useParams();
    const { data: hotelData, request, loading } = useRequest(hotelService.getByIdAndDate);
    const [rsvDrawerVisible, setRsvDrawerVisible] = useState(false)
    const [hotelRoomInfo, setHotelRoomInfo] = useState();
    const [date, setDate] = useState<string>(nowDate);
    const [hotelState, setHotelState] = useState(hotelData)

    useEffect(() => {
        updateHotelState()
    }, [date])

    const updateHotelState = async () => {
        const res = await request(params.id, date);
        setHotelState(res);
    }

    const showRsvHotel = (roomInfo) => {
        setRsvDrawerVisible(true);
        setHotelRoomInfo(roomInfo);
    }

    const renderExtra = (roomInfo) => {
        const { wareWithDate } = roomInfo;
        return <div>
            <div className={styles.price}><span style={{ fontSize: '18px' }}>￥</span>{roomInfo.originalPrice}</div>
            <Button disabled={!wareWithDate} type='secondary' onClick={() => showRsvHotel(roomInfo)}>{wareWithDate ? '立即预订' : '房间已订完'}</Button>
        </div>
    }
    if (!hotelData) {
        return <Loading fullScreen></Loading>
    }
    return <div>
        <div>
            <h2>酒店详情</h2>
            <Divider></Divider>
        </div>
        <ResponsiveGrid gap={20}>
            <Cell colSpan={8}>
                <Slider>{sliderNodes}</Slider>
            </Cell >
            <Cell colSpan={4}>
                <HotelInfo
                    title={hotelData.name}
                    score={hotelData.score}
                    description={hotelData.description}
                    location={hotelData.location}
                    phoneNumber={hotelData.phoneNumber}
                ></HotelInfo>
            </Cell>
        </ResponsiveGrid>

        <Row justify='center' style={{ marginTop: '30px' }}>
            <Col span='16'>
                日期选择：<DatePicker value={date} onChange={(v) => setDate(v as string)}></DatePicker>
            </Col>

        </Row>

        <Row justify='center' >
            <Col span='16'>
                <Tab className={styles.tab}>
                    <TabItem title="房间预订" key="1">
                        <List size='medium' className={styles.list} loading={loading}>
                            {hotelState && hotelState.rooms && hotelState.rooms.map(item => (
                                <ListItem
                                    key={item.id}
                                    extra={renderExtra(item)}
                                    title={<h2>{item.name}</h2>}
                                    // <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>大</Avatar>
                                    media={<img className={styles.img} src={hotelDeafultImg}></img>}
                                >
                                    <div>{item.areaCount}㎡ 大床 有窗</div>
                                    <div>仅剩<span className={styles.ware}>{item.wareWithDate}</span>间</div>
                                </ListItem>
                            ))}
                        </List>
                    </TabItem>
                    <TabItem title="评价" key="2">暂无</TabItem>
                </Tab>
            </Col>
        </Row>
        <Drawer
            title="酒店预订"
            placement="right"
            width='600px'
            visible={rsvDrawerVisible}
            onClose={() => setRsvDrawerVisible(false)}>
            <HotelRsvForm hotelRoomInfo={hotelRoomInfo}></HotelRsvForm>
        </Drawer>
    </div >
}

export default HotelRoom;