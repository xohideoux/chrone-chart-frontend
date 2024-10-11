import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/user';
import { ROUTE, TASKS_PER_PAGE, USER_CODE } from '../constants';
import { Header, FiltersSection, TasksList } from '../components';
import { useEffect, useState } from 'react';
import { getParamsFromObj } from '../utils';
import { fetchTasks } from '../http/taskApi';
import { useDebounce } from '../hooks/debounce';
import { TasksData } from '../types';
import Editor from '../components/Editor';
import Pagination from '../components/Pagination';
import Statistics from './Statistics';

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

  const [tasksData, setTasksData] = useState<TasksData | null>(null);
  const [filters, setFilters] = useState(initiaFilters);
  const [isEditor, setEditor] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [currSection, setCurrSection] = useState<'Tasks' | 'Statistics'>('Tasks');

  const debouncedFilters = useDebounce(filters, 1000);

  useEffect(() => {

    const filtersParams = getParamsFromObj(debouncedFilters);

    const page = currPage + 1;

    if (filters !== initiaFilters) {
      fetchTasks(filtersParams, userId, isAdmin, TASKS_PER_PAGE, page)
        .then((resp) => {
          setTasksData(resp);
        })
        .catch((err) => alert(err));
    }
  }, [currPage, debouncedFilters, filters, isAdmin, user, userId]);

  if (!userStore.isAuth) {
    return <Navigate to={ROUTE.login} />;
  }

  return (
    <main className='page_container'>
      <Header
        user={userStore}
        handleOpenEditor={() => setEditor(true)}
        tasksData={tasksData}
        currSection={currSection}
        setCurrSection={setCurrSection}
      />
      <div className='flex flex-col w-full flex-grow gap-6 py-6'>
        {currSection === 'Tasks'
          ? <>
            <FiltersSection setFilters={setFilters} />
            <TasksList isAdmin={isAdmin} tasksData={tasksData} setTasksData={setTasksData} />
          </>
          : <>
            <Statistics filters={filters} setFilters={setFilters} tasksData={tasksData} />
          </>}
        {tasksData &&
          <Pagination
            total={tasksData?.count}
            currPage={currPage}
            setCurrPage={setCurrPage}
            isLoading={!tasksData}
          />
        }
      </div>
      {isEditor && <Editor
        handleClose={() => setEditor(false)}
      />}
    </main>
  )
});

export default Dashboard;
