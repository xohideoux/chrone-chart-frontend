import { jwtDecode } from 'jwt-decode';
import { authHost, host } from '.';
import { LOCAL_TOKEN_KEY } from '../constants';

export const registration = async (email: string, password: string) => {
  const url = 'api/users/registration';
  const body = {
    email,
    password
  };

  return await host.post(url, body);
}

export const login = async (email: string, password: string) => {
  const url = 'api/users/login';
  const body = {
    email,
    password
  };

  const resp = await host.post(url, body);

  localStorage.setItem(LOCAL_TOKEN_KEY, resp.data.token);
  return resp;
}

export const checkAuth = async () => {
  const url = 'api/users/auth';

  const { data } = await authHost.get(url);
  localStorage.setItem(LOCAL_TOKEN_KEY, data.token);
  return jwtDecode(data.token);
}