import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { ROUTES } from '../constants';
import { useContext } from 'react';
import { Context } from '../main';

const AppRouter = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context is not defined');
  }

  const user = context.user;
  console.log(user);

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }, index: number) => (
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