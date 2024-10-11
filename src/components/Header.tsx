import { LOCAL_TOKEN_KEY } from '../constants';
import { ArrowBackIcon, CreateIcon, LogoutIcon, NotificationIcon, NotificationIconNew, StatisticsIcon } from '../icons';
import { TasksData, UserStore } from '../types';
import { Dispatch, SetStateAction, useState } from 'react';
import NotificationsList from './NotificationsList';

interface HeaderProps {
  user: UserStore,
  handleOpenEditor?: () => void,
  tasksData?: TasksData | null,
  currSection: 'Tasks' | 'Statistics',
  setCurrSection: Dispatch<SetStateAction<'Tasks' | 'Statistics'>>,
}

const Header = ({ user, handleOpenEditor, tasksData, currSection, setCurrSection }: HeaderProps) => {
  const isStatisticsPage = currSection === 'Statistics';

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

  return (
    <header className='flex_between py-5 border-b border-black-600'>
      <div className='flex items-center gap-2'>
        {isStatisticsPage && <button onClick={() => setCurrSection('Tasks')}><ArrowBackIcon /></button>}
        <h1 className='text-2xl font-bold capitalize'>{currSection}</h1>
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
        {!isStatisticsPage && <button className='header_button' onClick={() => setCurrSection('Statistics')}>
          <StatisticsIcon />
        </button>}
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