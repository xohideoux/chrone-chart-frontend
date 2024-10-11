import { Dispatch, SetStateAction, useEffect } from 'react';
import { Filters, TasksData } from '../types';
import StatisticsList from './StatisticsList';

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
  status: 0,
  dateFrom: weekAgoFormatted,
  dateTo: nowFormatted,
}

interface StatisticsProps {
  filters: Filters,
  setFilters: Dispatch<SetStateAction<Filters>>,
  tasksData: TasksData | null,
}

const Statistics = ({filters, setFilters, tasksData}: StatisticsProps) => {

  useEffect(() => {
    setFilters(initiaFilters);
  }, [])

  const handleRangeClick = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateFrom: value,
    }))
  }

  return (
    <main className='page_container'>
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
      </div>
    </main>
  )
};

export default Statistics;
