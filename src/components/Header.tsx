import { useLocation } from 'react-router-dom';
import { LOCAL_TOKEN_KEY } from '../constants';
import { ArrowBackIcon, CreateIcon, LogoutIcon, NotificationIcon, StatisticsIcon } from '../icons';
import { UserStore } from '../types';

interface HeaderProps {
  user: UserStore,
  handleOpenEditor?: () => void,
}

const Header = ({ user, handleOpenEditor }: HeaderProps) => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];
  const isStatisticsPage = currentPage === 'statistics';

  const handleLogout = () => {
    user.setUser(null);
    user.setAuth(false);
    localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

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
        {!isStatisticsPage && <button className='header_button'>
          <NotificationIcon />
        </button>}
        {!isStatisticsPage && <a href='/statistics' className='header_button'>
          <StatisticsIcon />
        </a>}
        <button className='header_button' onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
    </header>
  )
}

export default Header;