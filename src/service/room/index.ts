import {baseService} from '../index'

const prefix = 'room';
const hotelUrl = `${prefix}/hotel`;
const hotelRoomTypeUrl = `${prefix}/hotel-room-type`

const hotelService = baseService(hotelUrl);

const hotelRoomTypeService = baseService(hotelRoomTypeUrl)

export {
  hotelService, hotelRoomTypeService
}