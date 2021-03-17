import React from 'react'
import { Tag } from '@alifd/next'
import hotelDeafultImg from '@/assets/images/hotel.jpg'
import styles from './index.module.scss'

interface IProps {
    hotelImg?: string;
    title: string;
    score: number;
    location: string;
    price: number
}

const HotelCard = (props: IProps) => {
    const { hotelImg, title, score, location, price } = props;
    return <div className={styles.card}>
        <div>
            <img src={hotelImg ? hotelImg : hotelDeafultImg} alt="" className={styles.img} />
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