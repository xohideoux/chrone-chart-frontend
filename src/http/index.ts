import axios from 'axios';
import { LOCAL_TOKEN_KEY } from '../constants';

const host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authInterceptor = (config: any) => {
  const token = localStorage.getItem(LOCAL_TOKEN_KEY);

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};

authHost.interceptors.request.use(authInterceptor, (err) => {
  return Promise.reject(err);
});

export { host, authHost };
