import { lazy } from 'react';
import NotFound from '@pages/notFound';
import Login from '@pages/login';
import Regist from '@pages/regist';
import TimeLine from '@pages/home/timeLine';

export const publicRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/regist',
    component: Regist
  },
  {
    path: '/404',
    component: NotFound
  },
];

export const privateRoutes = [
  {
    path: '/myhis/timeline',
    component: TimeLine
  },
  {
    path: '/myhis/map',
    component: lazy(() => import('@pages/home/hisMap'))
  },
  {
    // 该项不对应单独的菜单，还是在“TimeLine”菜单项下
    path: '/myhis/refruler',
    component: lazy(() => import('@pages/home/editRuler'))
  },
];
