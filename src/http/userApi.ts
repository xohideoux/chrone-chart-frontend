import { jwtDecode } from 'jwt-decode';
import { authHost, host } from '.';
import { LOCAL_TOKEN_KEY } from '../constants';
import { AuthResponse, TokenResponse, User } from '../types';

export const fetchUsers = async () => {
  const url = 'api/users';

  const response: { data: { id: number; email: string; }[] } = await host.get(url);
  return response;
}

export const registration = async (email: string, password: string) => {
  const url = 'api/users/registration';
  const body = {
    email,
    password
  };

  const response: AuthResponse = await host.post(url, body);
  return response;
}

export const login = async (email: string, password: string) => {
  const url = 'api/users/login';
  const body = {
    email,
    password
  };

  const resp: TokenResponse = await host.post(url, body);
  // Storing the token in local storage
  localStorage.setItem(LOCAL_TOKEN_KEY, resp.data.token);
  return resp;
}

export const checkAuth = async () => {
  const url = 'api/users/auth';

  const { data }: TokenResponse = await authHost.get(url);
  // Storing the token in local storage
  localStorage.setItem(LOCAL_TOKEN_KEY, data.token);
  // Decoding the token to retrieve user information
  return jwtDecode<User>(data.token);
}