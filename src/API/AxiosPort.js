/** @format */

import axios from "axios";
import queryString from "query-string";

const { REACT_APP_API_URL } = process.env;

const AxiosPort = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});

AxiosPort.interceptors.request.use(async config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosPort.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error(error);
    return error;
  }
);

export default AxiosPort;
