import React, { useState } from 'react'
import { useRequest, useHistory } from 'ice'
import { hotelService } from '@/service/room'
import { Box, DatePicker, Divider, Loading } from '@alifd/next';
import HotelCard from '@/pages/HotelList/HotelCard'
import moment from 'moment'
const nowDate = moment().format("YYYY-MM-DD")

const HotelList = () => {
    const [date, setDate] = useState<string>(nowDate);
    const { data: hotelData, loading } = useRequest(hotelService.getList, {
        manual: false
    });
    const history = useHistory();

    const searchRoom = (v: string) => {
        console.log('v :>> ', v, new Date(v));
        setDate(v);
    }

    return <div>
        <div>
            <h2>酒店推荐</h2>
            <Divider></Divider>
        </div>
        <div>
            <DatePicker value={date} onChange={(v) => searchRoom(v as string)}></DatePicker>
        </div>
        <Loading visible={loading} fullScreen={true}>
            <Box direction='row' wrap={true} spacing={20} padding={20} >
                {hotelData && hotelData.list.map(item => <Box key={item.id} onClick={() => history.push(`hotel/${item.id}`)}>
                    <HotelCard
                        title={item.name}
                        price={item.price}
                        location={item.location}
                        score={item.score}></HotelCard>
                </Box>)}

            </Box>
        </Loading>


    </div>
}
export default HotelList;