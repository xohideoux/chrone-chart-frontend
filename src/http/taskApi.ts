import { authHost } from '.';


export const fetchTasks = async (filters: string, userId: number | undefined, isAdmin: boolean) => {
  let params = '?';

  if (filters !== '') {
    params += `${filters}`;
  }

  if (isAdmin && userId !== undefined) {
    params += `&assignee=${userId}`;
  }

  const url = `api/tasks${params}`;

  const { data } = await authHost.get(url);
  console.log(data);
}