import { ROUTE } from './constants';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';

export const routes = [
  {
    path: ROUTE.login,
    Component: Auth
  },
  {
    path: ROUTE.signUp,
    Component: Auth
  },
  {
    path: ROUTE.statistics,
    Component: Statistics
  },
  {
    path: ROUTE.dashboard,
    Component: Dashboard
  },
];