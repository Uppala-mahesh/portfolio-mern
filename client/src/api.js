import axios from 'axios';

/* 
 * In development: Vite proxy handles /api → localhost:5000
 * In production:  VITE_API_URL points to the deployed Render backend
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ''
});

export default api;
