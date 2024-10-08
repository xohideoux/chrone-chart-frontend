import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { useUser } from './hooks/user';
import { checkAuth } from './http/userApi';
import { Loader } from './components/';
import { User } from './types';
import AppRouter from './AppRouter';

const App = observer(() => {
  const user = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then((resp: User) => {
        user.setUser(resp);
        user.setAuth(true);
      })
      .finally(() => setLoading(false));
  }, [])

  if (loading) return (
    <div className='fixed inset-0 flex_center'>
      <Loader />
    </div>
  )

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
