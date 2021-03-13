import {request} from 'ice'

const prefix = 'room';
const url = `${prefix}/meeting`;


export default {
  async getMeetingList(curPage?: number, limit?: number) {
    return request(
        {url, method: 'GET', params: {page: curPage || 1, limit: limit || 10}})
  },
  async getMeetingById(id: number) {
    return request({
      url: `${url}/${id}`,
      method: 'GET',
    })
  },
  async addMeeting(data) {
    return request({url, method: 'POST', data})
  },
  async updateMeeting(id: number, data: any) {
    return request({url: `${url}/${id}`, method: 'PUT', data})
  },
  async deleteMeeting(id: number) {
    return request({url: `${url}/${id}`, method: 'DELETE'})
  }
}