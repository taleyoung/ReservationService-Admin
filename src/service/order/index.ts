import {request} from 'ice'

import {baseService} from '../index'

const prefix = 'order';
const payOrderUrl = `${prefix}/payOrder`
const hotelOrderUrl = `${prefix}/hotel-order`;
const hotelCheckInUrl = `${prefix}/hotel-check-in`;

const payOrder = (orderSn) => {
  return request({url: payOrderUrl, method: 'GET', params: {orderSn: orderSn}})
};

const testPayAndSuccess =
    (data) => {
      return request(
          {url: hotelOrderUrl + '/testPayAndSuccess', method: 'POST', data})
    }

const hotelOrderService = {
  ...baseService(hotelOrderUrl),
  payOrder,
  testPayAndSuccess
};



const updateStatus = (orderId: number, status: number) => {
  return request({
    url: `${hotelCheckInUrl}/status`,
    method: 'PUT',
    data: {orderId, status}
  })
};
const hotelCheckInService = {
  ...baseService(hotelCheckInUrl),
  updateStatus
}

export {
  hotelOrderService, hotelCheckInService
}