import {baseService} from '../index'

const prefix = 'order';
const hotelOrderUrl = `${prefix}/hotel-order`;
const hotelCheckInUrl = `${prefix}/hotel-check-in`

const hotelOrderService = baseService(hotelOrderUrl);

const hotelCheckInService = baseService(hotelCheckInUrl)

export {
  hotelOrderService, hotelCheckInService
}