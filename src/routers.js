import NotFound from '@pages/NotFound';
import Test1 from '@pages/TestPages/test1';
import Test2 from '@pages/TestPages/test2';
import Login from '@pages/Login';
import Home from '@pages/Home';

export const publicRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/test1',
    component: Test1
  },
  {
    path: '/test2',
    component: Test2
  },
  {
    path: '/404',
    component: NotFound
  },
];

export const privateRoutes = [
  {
    path: '/myhis/',
    component: Home
  },
];
