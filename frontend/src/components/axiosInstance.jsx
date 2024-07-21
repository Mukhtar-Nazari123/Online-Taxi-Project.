import axios from 'axios';

// Set default configurations for Axios
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;
axios.defaults.baseURL = 'http://localhost:8000'; // Update with your Laravel API base URL
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// Create an Axios instance
const axiosInstance = axios.create();

// Add a request interceptor to include the CSRF token in the headers
axiosInstance.interceptors.request.use(config => {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;