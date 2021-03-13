const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '快速预订',
    path: '/',
    icon: 'smile',
  },
  {
    name: '会议室',
    path: '/meeting',
    icon: 'calendar',
  },
  {
    name: '后台管理',
    icon: 'calendar',
    children: [
      {
        name: '会议室管理',
        path: '/admin/meeting-room',
      },
      {
        name: '会议查询',
        path: '/admin/meeting',
      }
    ]
  }
];

export {headerMenuConfig, asideMenuConfig};
