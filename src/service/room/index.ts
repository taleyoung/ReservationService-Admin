import {request} from 'ice'
import {baseService} from '../index'

const prefix = 'room';
const hotelUrl = `${prefix}/hotel`;
const hotelRoomTypeUrl = `${prefix}/hotel-room-type`

const getByIdAndDate = (id, date) => {
  return request({url: `${hotelUrl}/${id}`, method: 'GET', params: {date}})
};


const getRoomTypeByHotelId = (hotelId: number) =>
    (curPage?: number, limit?: number) => {
      return request({
        url: `${hotelUrl}/${hotelId}/hotel-room-type`,
        method: 'GET',
        params: {page: curPage || 1, limit: limit || 10}
      })
    };

const hotelService = {
  ...baseService(hotelUrl),
  getByIdAndDate,
  getRoomTypeByHotelId
};

const hotelRoomTypeService = {
  ...baseService(hotelRoomTypeUrl),
}

export {
  hotelService, hotelRoomTypeService
}