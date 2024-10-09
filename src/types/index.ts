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
  key: number,
  label: string,
}

export interface Filters {
  status: number,
  dateFrom: string,
  dateTo: string;
}