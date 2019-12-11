import axios from 'axios';
import { message as antdMessage } from 'antd'
import Cookies from 'js-cookie'
import { APIError } from 'lib/error';

const fetch = axios.create({
  baseURL: '//openapi.wanguo.press',
  withCredentials: true,
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
      window.location.replace(responseBody.url);
    }

    // 账号不存在
    if (code === 408) {
      antdMessage.error('用户不存在')
    }

    // 用户密码错误
    if (code === 409) {
      antdMessage.error('用户密码错误')
    }

    return Promise.reject(error);
  }

  return data;
});

export default fetch;
