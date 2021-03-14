import React, { useState } from 'react'
import { useRequest } from 'ice'
import { hotelService } from '@/service/room'
import { Box, DatePicker, Divider, TimePicker, Button, Table, Dialog, Drawer, Tag, Search } from '@alifd/next';

import moment from 'moment'
const nowDate = moment().format("YYYY-MM-DD")

const HotelRoom = () => {
    const [date, setDate] = useState<string>(nowDate);
    const { request } = useRequest(hotelService.getList);

    const searchRoom = (v: string) => {
        console.log('v :>> ', v, new Date(v));
        setDate(v);
    }

    return <div>
        <div>
            <h2>会议室预订</h2>
            <Divider></Divider>
        </div>
        <div>
            <DatePicker value={date} onChange={(v) => searchRoom(v as string)}></DatePicker>
        </div>
    </div>
}
export default HotelRoom;