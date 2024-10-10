import { Dispatch, memo, SetStateAction, useState } from 'react';
import { Task, TasksData } from '../types';
import { formatDateToString, getNameFromEmail } from '../utils';
import { DeleteIcon, EditIcon } from '../icons';
import { deleteTask } from '../http/taskApi';

import Editor from './Editor';
import Loader from './Loader';

interface TasksListProps {
  tasksData: TasksData | null,
  setTasksData: Dispatch<SetStateAction<TasksData | null>>
}

interface CardProps {
  task: Task,
  tasksData: TasksData | null,
  setTasksData: Dispatch<SetStateAction<TasksData | null>>
}

const Card = memo(({ task, tasksData, setTasksData }: CardProps) => {
  const [isEditor, setEditor] = useState(false);

  const statusToColor: { [key: string]: string } = {
    1: '#C1D6FD',
    2: '#FBEDBE',
    3: '#DFFCC3',
  }

  const handleDelete = () => {
    deleteTask(task.id)
      .then(() => {
        const updatedTasks = tasksData?.rows.filter(item => item.id !== task.id);

        if (!updatedTasks) return;

        setTasksData((prev) => ({
          rows: updatedTasks,
          count: prev ? prev.count : 0
        }));
      })
      .catch((err) => {
        alert(err);
      })
  }

  return (
    <>
      <div className="flex_col p-4 bg-white rounded-lg h-min shadow-sm">
        <div className='flex_between'>
          <h3 className='text-lg font-medium line-clamp-1 overflow-ellipsis'>{task.title}</h3>
          <div className='flex items-center gap-1'>
            <button onClick={() => setEditor(true)}>
              {<EditIcon />}
            </button>
            <button onClick={handleDelete}>
              {<DeleteIcon />}
            </button>
          </div>
        </div>
        <p
          className='my-1 text-xs self-start px-1 py-0.5 rounded-md'
          style={{
            backgroundColor: statusToColor[task.taskStatus.id]
          }}
        >
          {task.taskStatus.label}
        </p>
        <div className='text-xs'>
          <p><b>Cretor:</b> {getNameFromEmail(task.creatorUser.email)}</p>
          <p><b>Assignee:</b> {getNameFromEmail(task.assigneeUser.email)}</p>
          <p><b>Deadline:</b> {formatDateToString(task.deadline)}</p>
          <p className='mt-2 tex-xs break-words line-clamp-5'>
            {task.description}
          </p>
        </div>
      </div>
      {isEditor && <Editor task={task} handleClose={() => setEditor(false)} />}
    </>
  )
});

const TasksList = ({ tasksData, setTasksData }: TasksListProps) => {

  if (!tasksData) return (
    <div className='flex_center flex-grow'>
      <Loader />
    </div>
  )

  return (
    <div className="flex-grow grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tasksData.rows.map((task) => (
        <Card key={`task_${task.id}`} task={task} tasksData={tasksData} setTasksData={setTasksData} />
      ))}
    </div>
  )
}

export default TasksList;