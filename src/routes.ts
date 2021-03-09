import BasicLayout from '@/components/BasicLayout';
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
      {path: '/admin/room', exact: true, component: AdminRoom}
    ],
  },
];
export default routerConfig;
