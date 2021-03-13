export interface Meeting {
  d: number;
  name: string;
  meetingRoomId: number;
  meetingRoomName: string;
  date: Date;
  start: Time;
  end: Time;
  creatorId: number;
  creatorName: string;
  memberCount: number;
}