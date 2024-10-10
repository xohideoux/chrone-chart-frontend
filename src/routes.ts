import { ROUTE } from './constants';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';

export const routes = [
  {
    path: ROUTE.dashboard,
    Component: Dashboard
  },
  {
    path: ROUTE.statistics,
    Component: Statistics
  },
  {
    path: ROUTE.login,
    Component: Auth
  },
  {
    path: ROUTE.signUp,
    Component: Auth
  },
];