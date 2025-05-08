// api.ts
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/v1`,
  headers: {
      'Content-Type': 'application/json',
  },
  withCredentials: true,  // garante envio automático de cookies
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      document.cookie = `token=${token}; path=/`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      document.cookie = 'token=; path=/';
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;