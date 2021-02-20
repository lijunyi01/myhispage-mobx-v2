import { lazy } from 'react';
import NotFound from '@pages/NotFound';
import Login from '@pages/Login';
import TimeLine from '@pages/Home/TimeLine';

export const publicRoutes = [
  {
    path: '/login',
    component: Login
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
    component: lazy(() => import('@pages/Home/HisMap'))
  },
  {
    // 该项不对应单独的菜单，还是在“TimeLine”菜单项下
    path: '/myhis/refruler',
    component: lazy(() => import('@pages/Home/EditRuler'))
  },
];
