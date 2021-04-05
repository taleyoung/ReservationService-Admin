import {request} from 'ice'
import {baseService} from '../index'

const prefix = 'user';
const userUrl = `${prefix}/user`
const optLogUrl = `${prefix}/opt-log`

const login = (data) => {
  return request({url: `${userUrl}/login`, method: 'POST', data});
};

const userService = {
  ...baseService(userUrl),

  login
}

const optLogService = {
  ...baseService(optLogUrl),
}

export {
  userService, optLogService
}
