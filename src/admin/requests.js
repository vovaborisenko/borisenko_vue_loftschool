import axios from 'axios';
import config from './../../env.paths.json';

const token = localStorage.getItem('token');

axios.defaults.baseURL = config.BASE_URL;

token && (axios.defaults.headers['Authorization'] = `Bearer ${token}`);

axios.interceptors.response.use(
  result => result,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const { data } = await axios.post('/refreshToken');
      const token = data.token;

      localStorage.setItem('token', token);
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      originalRequest.headers['Authorization'] = `Bearer ${token}`;

      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axios;
