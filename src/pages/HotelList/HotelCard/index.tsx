import React from 'react'
import { Tag } from '@alifd/next'
import hotelDeafultImg01 from '@/assets/images/hotel.jpg'
import hotelRoomImg02 from '@/assets/images/hotelRoom01.jpeg'
import hotelRoomImg03 from '@/assets/images/hotelRoom02.jpeg'
import hotelRoomImg04 from '@/assets/images/hotelRoom03.jpeg'
import hotelRoomImg05 from '@/assets/images/hotelRoom04.jpeg'

import styles from './index.module.scss'

const hotelDeafultImg = [hotelDeafultImg01, hotelRoomImg02, hotelRoomImg03, hotelRoomImg04, hotelRoomImg05];
interface IProps {
    hotelImg?: string;
    title: string;
    score: number;
    location: string;
    price: number;
    index: number
}

const HotelCard = (props: IProps) => {
    const { hotelImg, title, score, location, price, index } = props;
    return <div className={styles.card}>
        <div>
            <img src={hotelImg ? hotelImg : hotelDeafultImg[index % 5]} alt="" className={styles.img} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.score}>{score}<span style={{ fontSize: '15px' }}>分</span></div>
        <div className={styles.location}>{location}</div>
        <div className={styles.action}>
            <div>
                <Tag size='small' color='blue' className={styles.tag}>免费取消</Tag>
                <Tag size='small' color='blue' className={styles.tag}>供应早餐</Tag>
            </div>
            <div className={styles.price}>￥<span style={{ fontSize: '20px' }}>{price || 99}</span>起</div>
        </div>

    </div>
}

export default HotelCard