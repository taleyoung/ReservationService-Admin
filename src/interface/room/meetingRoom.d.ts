export interface MeetingRoom {
  id: number;
  name: string;
  device: string;
  description: string;
  location: string;
  capacity: number;
  image?: string;
  areaId: number;
  areaName: string;
  adminId: number;
  status: number;
}

export interface MeetingRoomRsv extends MeetingRoom {
  rsvTimeList: any;
}