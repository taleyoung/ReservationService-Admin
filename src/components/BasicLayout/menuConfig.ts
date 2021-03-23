const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/home',
    icon: 'smile',
  },
  {
    name: '酒店预订',
    path: '/hotel',
    icon: 'calendar',
  },
  {
    name: '会议室',
    path: '/meeting',
    icon: 'calendar',
  },
  {name: '===后台管理===', path: '/'},
  {
    name: '酒店客房管理',
    icon: 'calendar',
    children: [
      {
        name: '酒店管理',
        path: '/admin/hotel',
      },
      {
        name: '客房登记查询',
        path: '/admin/hotel/checkIn',
      },
      {name: '订单查询', path: '/admin/hotel/order'}
    ]
  },
  {
    name: '会议室管理',
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
  },
];

export {headerMenuConfig, asideMenuConfig};
