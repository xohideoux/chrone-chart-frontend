import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/user';
import { ROUTE } from '../constants';
import { Header, Filters, TasksList } from '../components';

const Dashboard = observer(() => {
  const user = useUser();

  if (!user.isAuth) {
    return <Navigate to={ROUTE.login} />;
  }

  return (
    <main className='page_container'>
      <Header user={user} />
      <div className='flex flex-col w-full flex-grow gap-6 py-6'>
        <Filters />
        <TasksList />
      </div>
    </main>
  )
})

export default Dashboard;