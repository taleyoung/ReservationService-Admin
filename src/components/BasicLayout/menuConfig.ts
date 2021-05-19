const headerMenuConfig = [];

interface IMenu {
  name: string;
  icon: string;
  path?: string;
  children?: {name: string; path: string}[];
}

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
  {
    name: '用户管理',
    icon: 'calendar',
    children: [
      {name: '所有用户', path: '/admin/user'},
      {name: '用户留痕', path: '/admin/log'}
    ]
  },
];

const baseMenu: IMenu[] = [
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
];

const hotelAdmin = {
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
}

const meetingAdmin = {
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
};

const userAdmin = {
  name: '用户管理',
  icon: 'calendar',
  children: [
    {name: '所有用户', path: '/admin/user'},
    {name: '用户操作留痕', path: '/admin/log'}
  ]
}

const hotelAdminMenu = [...baseMenu, hotelAdmin];

const meetingAdminMenu = [...baseMenu, meetingAdmin];

const superAdminMenu = [...baseMenu, hotelAdmin, meetingAdmin, userAdmin];

const roleMenuMap = [
  superAdminMenu, superAdminMenu, hotelAdminMenu, meetingAdminMenu, baseMenu
];

export {
  headerMenuConfig,
  asideMenuConfig,
  hotelAdminMenu,
  meetingAdminMenu,
  superAdminMenu,
  roleMenuMap
};
