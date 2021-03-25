import {request} from 'ice'
import {baseService} from '../index'

const prefix = 'user';
const userUrl = `${prefix}/user`

const login = (data) => {
  return request({url: `${userUrl}/login`, method: 'POST', data});
};

const userService = {
  ...baseService(userUrl),
  login
}

export {
  userService
}
