import axios from 'axios';
import { LOCAL_TOKEN_KEY } from '../constants';

// Instance for general requests
const host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Instance for requests that require authorization
const authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor to add the authorization token to requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authInterceptor = (config: any) => {
  const token = localStorage.getItem(LOCAL_TOKEN_KEY);

  if (token) {
    // Add token to request headers
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
