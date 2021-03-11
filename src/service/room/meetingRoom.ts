import {MeetingRoom} from '@/interface/room/meetingRoom'
import {request} from 'ice'

const prefix = 'room';
const roomInfoUrl = `${prefix}/meeting-room`;


export default {
  async getMeetingRoom(curPage?: number, limit?: number) {
    return request({
      url: roomInfoUrl,
      method: 'GET',
      params: {page: curPage || 1, limit: limit || 10}
    })
  },
  async addMeetingRoom(data: MeetingRoom) {
    return request({url: roomInfoUrl, method: 'POST', data})
  },
  async updateMeetingRoom(id: number, data: MeetingRoom) {
    return request({url: `${roomInfoUrl}/${id}`, method: 'PUT', data})
  },
  async deleteMeetingRoom(id: number) {
    return request({url: `${roomInfoUrl}/${id}`, method: 'DELETE'})
  }
}