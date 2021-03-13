import {MeetingRoom} from '@/interface/room/meetingRoom'
import {request} from 'ice'

const prefix = 'room';
const roomInfoUrl = `${prefix}/meeting-room`;

interface Params {
  meetingFlag?: boolean;
  curPage?: number;
  limit?: number
}

export default {
  async getMeetingRoom(params: Params) {
    return request({
      url: roomInfoUrl,
      method: 'GET',
      params: {page: 1, limit: 10, reserved: false, ...params}
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