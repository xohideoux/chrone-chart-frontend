import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { useUser } from './hooks/user';
import { checkAuth } from './http/userApi';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader';

const App = observer(() => {
  const user = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then(resp => {
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
