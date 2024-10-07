import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { ROUTES } from '../constants';
import { useUser } from '../hooks/user';

const AppRouter = () => {
  const user = useUser();

  return (
    <Routes>
      {authRoutes.map(({ path, Component }, index: number) => (
        <Route
          key={`auth_route_${index}`}
          path={path}
          element={<Component />}
        />
      ))}
      {publicRoutes.map(({ path, Component }, index: number) => (
        <Route
          key={`public_route_${index}`}
          path={path}
          element={<Component />}
        />
      ))}
      <Route path="*" element={<Navigate to={ROUTES.dashboard} />} />
    </Routes>
  )
}

export default AppRouter;