import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import { ROUTE } from './constants';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }, index: number) => (
        <Route
          key={`auth_route_${index}`}
          path={path}
          element={<Component />}
        />
      ))}
      <Route path="*" element={<Navigate to={ROUTE.dashboard} />} />
    </Routes>
  )
}

export default AppRouter;