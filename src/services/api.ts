import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
