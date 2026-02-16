import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export function setAuth(token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearAuth() {
  delete API.defaults.headers.common['Authorization'];
}

// Auth endpoints
export async function register(email, password, fullName = null) {
  const response = await API.post('/api/auth/register', {
    email,
    password,
    full_name: fullName,
  });
  return response.data;
}

export async function login(email, password) {
  const response = await API.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
}

export async function getCurrentUser() {
  const response = await API.get('/api/auth/me');
  return response.data;
}

export default API;

