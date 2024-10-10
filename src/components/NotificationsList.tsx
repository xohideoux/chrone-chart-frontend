import { Task } from '../types';

interface NotificationsListProps {
  tasks: Task[] | undefined,
  handleClose: () => void,
}

const NotificationsList = ({ tasks, handleClose }: NotificationsListProps) => {

  return (
    <div className='fixed inset-0 bg-slate-500/50 flex_center z-50'>
      <div className='flex flex-col items-center p-8 rounded-2xl bg-white gap-6'>
        <div className='w-full flex flex-col gap-4'>
          <h2 className='text-lg font-medium'>Upcoming deadlines:</h2>
          {tasks !== undefined && tasks.map((task) => (
            <div key={`notification_${task.id}`} className='text-sm font-medium'>
              {task.title}
            </div>
          ))}
        </div>
        <button className='button rose h-10 w-40' onClick={handleClose}>
          OK
        </button>
      </div>
    </div>
  )
}

export default NotificationsList;