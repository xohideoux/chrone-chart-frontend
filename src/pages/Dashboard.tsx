import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/user';
import { ROUTE, USER_CODE } from '../constants';
import { Header, FiltersSection, TasksList } from '../components';
import { useEffect, useState } from 'react';
import { getParamsFromObj } from '../utils';
import { fetchTasks } from '../http/taskApi';
import { useDebounce } from '../hooks/debounce';

const initiaFilters = {
  status: 0,
  dateFrom: '',
  dateTo: ''
}

const Dashboard = observer(() => {
  const userStore = useUser();
  const user = userStore.user;
  const isAdmin = user?.role === USER_CODE.admin;
  const userId = user?.id;
  const [filters, setFilters] = useState(initiaFilters);

  const debouncedFilters = useDebounce(filters, 1000);

  useEffect(() => {

    const filtersParams = getParamsFromObj(debouncedFilters);

    if (filters !== initiaFilters) {
      fetchTasks(filtersParams, userId, isAdmin);
    }
  }, [debouncedFilters, user]);

  if (!userStore.isAuth) {
    return <Navigate to={ROUTE.login} />;
  }

  return (
    <main className='page_container'>
      <Header user={userStore} />
      <div className='flex flex-col w-full flex-grow gap-6 py-6'>
        <FiltersSection setFilters={setFilters} />
        <TasksList />
      </div>
    </main>
  )
});

export default Dashboard;
