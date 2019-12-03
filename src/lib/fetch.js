import axios from 'axios';
import { APIError } from 'lib/error';

const fetch = axios.create({
  baseURL: '/',
  crossDomain: true,
  withCredentials: false,
  responseType: 'json',
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
});

fetch.Cancel = axios.Cancel;
fetch.CancelToken = axios.CancelToken;
fetch.isCancel = axios.isCancel;
fetch.all = axios.all;
fetch.spread = axios.spread;


fetch.interceptors.response.use(async response => {
  const { config, data } = response;
  const { code, message, data: responseBody } = data;
  const { url, autoLogin = true } = config;

  if (code !== 0) {
    const error = new APIError(message);
    error.code = code;
    error.url = url;
    // 自动登录逻辑
    if(code === -2 && autoLogin) {
      global.location.replace(responseBody.url);
    }

    return Promise.reject(error);
  }

  return data;
});

export default fetch;
