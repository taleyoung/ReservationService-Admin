import {request} from 'ice'

import {baseService} from '../index'

const prefix = 'order';
const payOrderUrl = `${prefix}/payOrder`
const hotelOrderUrl = `${prefix}/hotel-order`;
const hotelCheckInUrl = `${prefix}/hotel-check-in`;

const payOrder =
    (orderSn) => {
      return request(
          {url: payOrderUrl, method: 'GET', params: {orderSn: orderSn}})
    }

const hotelOrderService = {
  ...baseService(hotelOrderUrl),
  payOrder
}

const hotelCheckInService = baseService(hotelCheckInUrl)

export {
  hotelOrderService, hotelCheckInService
}