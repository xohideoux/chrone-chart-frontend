import { useLocation } from 'react-router-dom';
import { LOCAL_TOKEN_KEY } from '../constants';
import { ArrowBackIcon, CreateIcon, LogoutIcon, NotificationIcon, NotificationIconNew, StatisticsIcon } from '../icons';
import { TasksData, UserStore } from '../types';
import { useState } from 'react';
import NotificationsList from './NotificationsList';

interface HeaderProps {
  user: UserStore,
  handleOpenEditor?: () => void,
  tasksData?: TasksData | null,
}

const Header = ({ user, handleOpenEditor, tasksData }: HeaderProps) => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];
  const isStatisticsPage = currentPage === 'statistics';

  const [isNotificationsList, setNotificationsList] = useState(false);

  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - 1);
  dateFrom.setHours(23);
  dateFrom.setMinutes(59);
  dateFrom.setSeconds(59);
  const dateto = new Date();
  dateto.setDate(dateto.getDate() + 2);
  const notificationTasks = tasksData?.rows
    .filter((task => (new Date(task.deadline) < dateto && new Date(task.deadline) > dateFrom)));

  const handleLogout = () => {
    user.setUser(null);
    user.setAuth(false);
    localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  console.log(notificationTasks);

  return (
    <header className='flex_between py-5 border-b border-black-600'>
      <div className='flex items-center gap-2'>
        {isStatisticsPage && <a href='/dashboard'><ArrowBackIcon /></a>}
        <h1 className='text-2xl font-bold capitalize'>{currentPage}</h1>
      </div>
      <div className='flex items-center gap-6'>
        {!isStatisticsPage && <button className='header_button' onClick={handleOpenEditor}>
          <CreateIcon />
        </button>}
        {!isStatisticsPage && <button className='header_button' onClick={() => setNotificationsList(true)}>
          {notificationTasks?.length
            ? <NotificationIconNew />
            : <NotificationIcon />
          }
        </button>}
        {!isStatisticsPage && <a href='/statistics' className='header_button'>
          <StatisticsIcon />
        </a>}
        <button className='header_button' onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
      {isNotificationsList && <NotificationsList
        tasks={notificationTasks}
        handleClose={() => setNotificationsList(false)}
      />}
    </header>
  )
}

export default Header;