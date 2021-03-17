import React from 'react'
import { Rating, Divider } from '@alifd/next'
import styles from './index.module.scss'

interface IProps {
    title: string;
    score: number;
    description: string;
    phoneNumber: string;
    location: string;
}
const HotelInfo = (props: IProps) => {
    const { title, score, description, phoneNumber, location } = props;
    return <div className={styles.container}>
        <h2>{title}</h2>
        <div><Rating disabled value={score} ></Rating></div>
        <Divider></Divider>
        <div className={styles.tip}>描述：{description}</div>
        <div className={styles.tip}>位置：{location}</div>
        <div className={styles.tip}>电话：{phoneNumber}</div>
    </div>
}

export default HotelInfo;