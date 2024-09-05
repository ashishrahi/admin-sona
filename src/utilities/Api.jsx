import axios from 'axios';

const api = axios.create({
  baseURL: `https://jewellery-api.vercel.app/api/`,
});

export default api;
