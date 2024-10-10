import { TasksData, Task } from '../types';

interface StatisticsListProps {
  tasksData: TasksData | null,
}

const ListItem = ({ task }: { task: Task }) => {
  return (
    <div className='p-3 border-b border-black-400'>
      <h3 className='text-sm'>{task.title}</h3>
    </div>
  )
}

const StatisticsList = ({ tasksData }: StatisticsListProps) => {

  return (
    <section className='flex flex-col sm:flex-row gap-4 flex-grow'>
      <div className='flex-grow p-3 sm:p-4 rounded-lg shadow-sm bg-white'>
        <h2 className='text-lg font-medium'>Completed:</h2>
        {tasksData?.rows
          .filter((task) => task.taskStatus.id === 3)
          .map((task) => (
            <ListItem key={`task_${task.id}`} task={task} />
          ))}
      </div>
      <div className='flex-grow p-3 sm:p-4 rounded-lg shadow-sm bg-white'>
        <h2 className='text-lg font-medium'>Expired:</h2>
        {tasksData?.rows
          .filter((task) => new Date(task.deadline) < new Date())
          .map((task) => (
            <ListItem key={`task_${task.id}`} task={task} />
          ))}
      </div>
    </section>
  )
}

export default StatisticsList;