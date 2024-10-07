import { ROUTES } from './constants';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

export const authRoutes = [
  {
    path: ROUTES.dashboard,
    Component: Dashboard
  }
];

export const publicRoutes = [
  {
    path: ROUTES.login,
    Component: Auth
  },
  {
    path: ROUTES.signUp,
    Component: Auth
  },
];