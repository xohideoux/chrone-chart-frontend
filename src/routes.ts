import { ROUTE } from './constants';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

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
    path: ROUTE.dashboard,
    Component: Dashboard
  },
];