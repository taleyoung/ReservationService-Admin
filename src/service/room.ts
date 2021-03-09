import {RoomInfo} from '@/interface/room'
import {request} from 'ice'

const prefix = 'room';
const roomInfoUrl = `${prefix}/room`

export default {
  async getRoomInfo(params) {
    return request({url: roomInfoUrl, method: 'GET', params})
  }
  , async addRoomInfo(data) {
    return request({url: roomInfoUrl, method: 'POST', data})
  }
  , async updateRoomInfo(id: number, data: RoomInfo) {
    return request({url: `${roomInfoUrl}/${id}`, method: 'PUT', data})
  }
  , async deleteRoomInfo(data) {
    return request({url: roomInfoUrl, method: 'DELETE', data})
  }
}