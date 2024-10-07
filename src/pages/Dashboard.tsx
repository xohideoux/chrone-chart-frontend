import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/user';
import { LOCAL_TOKEN_KEY, ROUTES } from '../constants';

const Dashboard = observer(() => {
  const user = useUser();

  const handleLogout = () => {
    user.setUser(null);
    user.setAuth(false);
    localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  if (!user.isAuth) {
    return <Navigate to={ROUTES.login} />;
  }

  return (
    <div>
      {user.user?.id}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
})

export default Dashboard;