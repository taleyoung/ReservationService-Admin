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
    children: [{
      name: '会议室管理',
      path: '/admin/room',

    }]
  }
];

export {headerMenuConfig, asideMenuConfig};
