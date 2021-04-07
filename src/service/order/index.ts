import {request} from 'ice'

import {baseService} from '../index'

const prefix = 'order';
const payOrderUrl = `${prefix}/payOrder`
const hotelOrderUrl = `${prefix}/hotel-order`;
const hotelCheckInUrl = `${prefix}/hotel-check-in`;

const payOrder = (orderSn) => {
  return request({url: payOrderUrl, method: 'GET', params: {orderSn: orderSn}})
};

const testPayAndSuccess = (data) => {
  return request(
      {url: hotelOrderUrl + '/testPayAndSuccess', method: 'POST', data})
};
const testPayAndCancel = (data) => {
  return request(
      {url: hotelOrderUrl + '/testPayAndCancel', method: 'POST', data})
};

const hotelOrderService = {
  ...baseService(hotelOrderUrl),
  payOrder,
  testPayAndSuccess,
  testPayAndCancel
};



const updateStatus = (orderId: number, status: number) => {
  return request({
    url: `${hotelCheckInUrl}/status`,
    method: 'PUT',
    data: {orderId, status}
  })
};

const getListByUser = (params) => {
  return request({
    url: `${hotelCheckInUrl}/user`,
    method: 'GET',
    params: {page: 1, limit: 10, ...params}
  })
};

const hotelCheckInService = {
  ...baseService(hotelCheckInUrl),
  updateStatus,
  getListByUser,
}

export {
  hotelOrderService, hotelCheckInService
}