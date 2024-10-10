export interface User {
  id: number
  email: string
  role: number
}

export interface AuthResponse {
  data: {
    message: string
  }
}

export interface TokenResponse {
  data: {
    token: string
  }
}

export interface UserStore {
  isAuth: boolean,
  user: User | null,
  setAuth: (arg0: boolean) => void,
  setUser: (arg0: User | null) => void,
}

export interface Status {
  id: number,
  label: string,
}

export interface Filters {
  status: number,
  dateFrom: string,
  dateTo: string,
}

export interface Task {
  id: number,
  title: string,
  deadline: string,
  description: string,
  status: number,
  taskStatus: Status,
  creatorUser: User,
  assigneeUser: User,
}

export interface TasksData {
  count: number,
  rows: Task[],
}

export interface TaskForm {
  title: string,
  deadline: string,
  description: string,
  status: number | undefined,
  assignee: number | undefined,
}