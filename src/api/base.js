import axios from 'axios';
import { ACCESS_TOKEN, BASE_URL, HTTP_METHODS } from '../consts/net.js';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const handleRequest = config => {
  const TOKEN = localStorage.getItem(ACCESS_TOKEN);

  return TOKEN
    ? {
        ...config,
        headers: {
          ...config.headers,
          Authorization: TOKEN,
        },
      }
    : config;
};

const handleRespone = response => {
  return response.data;
};

const createApiMethod = (axiosInstance, methodType) => config => {
  return axiosInstance({ ...handleRequest(config), method: methodType }).then(handleRespone);
};

export default {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};
