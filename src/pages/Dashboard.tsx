import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/user';
import { ROUTE } from '../constants';
import { Header, Filters, TasksList } from '../components';
import { useEffect, useState } from 'react';

const initiaFilters = {
  status: '',
  date_from: '',
  date_to: ''
}

const Dashboard = observer(() => {
  const user = useUser();
  const [filters, setFilters] = useState(initiaFilters);

  useEffect(() => {
    console.log(filters);
  }, [filters])


  if (!user.isAuth) {
    return <Navigate to={ROUTE.login} />;
  }

  return (
    <main className='page_container'>
      <Header user={user} />
      <div className='flex flex-col w-full flex-grow gap-6 py-6'>
        <Filters setFilters={setFilters} />
        <TasksList />
      </div>
    </main>
  )
})

export default Dashboard;