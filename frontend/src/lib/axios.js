import axios from 'axios'

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const rawSocketUrl = import.meta.env.VITE_SOCKET_URL?.trim();

const normalizeApiUrl = (url) => {
  if (!url) return null;
  return url.replace(/\/+$/, "");
};

const BASE_URL = normalizeApiUrl(rawApiUrl)
  || (rawSocketUrl ? `${normalizeApiUrl(rawSocketUrl)}/api` : null)
  || (import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : 'https://convoflow-backend-9fms.onrender.com/api');

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
