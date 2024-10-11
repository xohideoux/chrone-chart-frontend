import { authHost } from '.';
import { TASKS_PER_PAGE } from '../constants';
import { TaskForm, TasksData } from '../types';


export const fetchTasks = async (
  filters: string, userId: number | undefined, isAdmin: boolean, limit: number = TASKS_PER_PAGE, page: number = 1
) => {
  let params = `?limit=${limit}&page=${page}`;

  if (filters !== '') {
    params += `&${filters}`; // Adding filters to the params if provided
  }

  if (!isAdmin && userId !== undefined) {
    params += `&assignee=${userId}`; // Filtering tasks by current user if not an admin
  }

  const url = `api/tasks${params}`;

  const { data }: { data: TasksData } = await authHost.get(url);
  return data;
}

export const createTask = async (newTask: TaskForm) => {
  const url = 'api/tasks/create/';

  const { data } = await authHost.post(url, newTask);
  return data;
}

export const editTask = async (newTask: TaskForm, id: number) => {
  const url = `api/tasks/edit/${id}`;

  const { data } = await authHost.patch(url, newTask);
  return data;
}

export const deleteTask = async (taskId: number) => {
  const url = `api/tasks/delete/${taskId}`;

  const { data } = await authHost.delete(url);
  return data;
}

export const fetchStatuses = async () => {
  const url = `api/tasks/statuses`;

  const { data }: {data: {id: number, label: string}[]} = await authHost.get(url);
  return data;
}