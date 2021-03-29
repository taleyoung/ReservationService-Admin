import {request} from 'ice'
import {baseService} from '../index'

const prefix = 'room';
const hotelUrl = `${prefix}/hotel`;
const hotelRoomTypeUrl = `${prefix}/hotel-room-type`

const getByIdAndDate = (id, date) => {
  return request({url: `${hotelUrl}/${id}`, method: 'GET', params: {date}})
};


const getRoomTypeByHotelId = (hotelId: number) => (params) => {
  return request({
    url: `${hotelUrl}/${hotelId}/hotel-room-type`,
    method: 'GET',
    params: {page: 1, limit: 10, ...params}
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