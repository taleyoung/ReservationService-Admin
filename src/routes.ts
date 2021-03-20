import BasicLayout from '@/components/BasicLayout';
import AdminCheckIn from '@/pages/AdminCheckIn'
import AdminHotel from '@/pages/AdminHotel'
import AdminHotelOrder from '@/pages/AdminHotelOrder'
import AdminHotelRoom from '@/pages/AdminHotelRoom'
import AdminMeeting from '@/pages/AdminMeeting'
import AdminMeetingRoom from '@/pages/AdminMeetingRoom';
import Dashboard from '@/pages/Dashboard';
import HotelList from '@/pages/HotelList'
import HotelRoom from '@/pages/HotelRoom'
import MeetingRoom from '@/pages/MeetingRoom'

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
      },
      {path: '/meeting', exact: true, component: MeetingRoom},
      {path: '/hotel', exact: true, component: HotelList},
      {path: '/hotel/:id', exact: true, component: HotelRoom},
      {path: '/admin/meeting-room', exact: true, component: AdminMeetingRoom},
      {path: '/admin/meeting', exact: true, component: AdminMeeting},
      {path: '/admin/hotel', exact: true, component: AdminHotel},
      {path: '/admin/hotel/order', exact: true, component: AdminHotelOrder},
      {path: '/admin/hotel/checkIn', exact: true, component: AdminCheckIn},
      {path: '/admin/hotel/:id', exact: true, component: AdminHotelRoom},
    ],
  },
];
export default routerConfig;
