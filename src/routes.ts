import BasicLayout from '@/components/BasicLayout';
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
      {path: '/meeting', exact: true, component: MeetingRoom}
    ],
  },
];
export default routerConfig;
