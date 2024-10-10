import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/user';
import { ROUTE, TASKS_PER_PAGE, USER_CODE } from '../constants';
import { Header } from '../components';
import { useEffect, useState } from 'react';
import { getParamsFromObj } from '../utils';
import { fetchTasks } from '../http/taskApi';
import { useDebounce } from '../hooks/debounce';
import { TasksData } from '../types';
import Pagination from '../components/Pagination';
import StatisticsList from '../components/StatisticsList';

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const now = new Date();
const nowFormatted = formatDate(now);

const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);
const yesterdayFormatted = formatDate(yesterday);

const weekAgo = new Date(now);
weekAgo.setDate(now.getDate() - 7);
const weekAgoFormatted = formatDate(weekAgo);

const monthAgo = new Date(now);
monthAgo.setMonth(now.getMonth() - 1);
const monthAgoFormatted = formatDate(monthAgo);

const timeRanges = [
  {
    title: 'Last Day',
    filterValue: yesterdayFormatted,
  },
  {
    title: 'Last Week',
    filterValue: weekAgoFormatted,
  },
  {
    title: 'Last Month',
    filterValue: monthAgoFormatted,
  },
]

const initiaFilters = {
  dateFrom: weekAgoFormatted,
  dateTo: nowFormatted,
}

const Statistics = observer(() => {
  const userStore = useUser();
  const user = userStore.user;
  const isAdmin = user?.role === USER_CODE.admin;
  const userId = user?.id;

  const [tasksData, setTasksData] = useState<TasksData | null>(null);
  const [filters, setFilters] = useState(initiaFilters);
  const [currPage, setCurrPage] = useState(0);

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    const filtersParams = getParamsFromObj(debouncedFilters);

    const page = currPage + 1;

    fetchTasks(filtersParams, userId, isAdmin, TASKS_PER_PAGE, page)
      .then((resp) => {
        setTasksData(resp);
      })
      .catch((err) => alert(err));

  }, [currPage, debouncedFilters, filters, isAdmin, user, userId]);

  if (!userStore.isAuth) {
    return <Navigate to={ROUTE.login} />;
  }

  const handleRangeClick = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateFrom: value,
    }))
  }

  return (
    <main className='page_container'>
      <Header user={userStore} />
      <div className='flex flex-col w-full flex-grow gap-6 py-6'>
        <section className='flex items-center gap-4'>
          {timeRanges.map((range, index) => (
            <button
              key={`date_range_${index}`}
              className={`
                px-2 py-1.5 rounded-lg font-medium text-sm  text-white
                ${filters.dateFrom !== range.filterValue
                  ? 'bg-black-400'
                  : 'bg-accent-500'}
              `}
              onClick={() => handleRangeClick(range.filterValue)}
            >
              {range.title}
            </button>
          ))}
        </section>
        <StatisticsList tasksData={tasksData} />
        {tasksData &&
          <Pagination
            total={tasksData?.count}
            currPage={currPage}
            setCurrPage={setCurrPage}
            isLoading={!tasksData}
          />
        }
      </div>
    </main>
  )
});

export default Statistics;
