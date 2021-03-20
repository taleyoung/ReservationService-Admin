import {request} from 'ice'
import {baseService} from '../index'

const prefix = 'room';
const hotelUrl = `${prefix}/hotel`;
const hotelRoomTypeUrl = `${prefix}/hotel-room-type`

const getByIdAndDate =
    (id, date) => {
      return request({url: `${hotelUrl}/${id}`, method: 'GET', params: {date}})
    }

const hotelService = {
  ...baseService(hotelUrl),
  getByIdAndDate
};

const hotelRoomTypeService = baseService(hotelRoomTypeUrl)

export {
  hotelService, hotelRoomTypeService
}