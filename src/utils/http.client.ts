import axios from 'axios';
import { getCookie } from './helpers/cookies.helper';

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const storageApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STORAGE_API_URL
});

storageApi.interceptors.request.use((config) => {
  const token = getCookie('_at');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})