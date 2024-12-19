import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Cache-Control': 'max-age=3600'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log('Request URL:', config.url);
    console.log('Request Method:', config.method);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance; 