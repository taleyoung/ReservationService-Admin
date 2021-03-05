export interface RoomInfo {
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
  reservedTimeList: any;
  status: number;
}