import BasicLayout from '@/components/BasicLayout';
import AdminMeeting from '@/pages/AdminMeeting'
import AdminRoom from '@/pages/AdminRoom';
import Dashboard from '@/pages/Dashboard';
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
      {path: '/admin/meeting-room', exact: true, component: AdminRoom},
      {path: '/admin/meeting', exact: true, component: AdminMeeting}
    ],
  },
];
export default routerConfig;
