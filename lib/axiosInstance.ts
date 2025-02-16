import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Dummy backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for future auth handling
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
