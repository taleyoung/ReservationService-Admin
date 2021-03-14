import BasicLayout from '@/components/BasicLayout';
import AdminHotel from '@/pages/AdminHotel'
import AdminMeeting from '@/pages/AdminMeeting'
import AdminMeetingRoom from '@/pages/AdminMeetingRoom';
import Dashboard from '@/pages/Dashboard';
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
      {path: '/hotel', exact: true, component: HotelRoom},
      {path: '/admin/meeting-room', exact: true, component: AdminMeetingRoom},
      {path: '/admin/meeting', exact: true, component: AdminMeeting},
      {path: '/admin/hotel', exact: true, component: AdminHotel}
    ],
  },
];
export default routerConfig;
