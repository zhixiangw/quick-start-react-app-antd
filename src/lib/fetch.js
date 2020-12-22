import axios from 'axios';
import { message as antdMessage } from 'antd'
import { APIError } from 'lib/error';


// export const baseURL = '//openapi.wanguo.press'
// export const baseURL = '//test-app.wanguo.press'
export const baseURL = 'http://localhost:7001'
const fetch = axios.create({
  baseURL,
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
    if (code === -2 && autoLogin) {
      window.location.replace(responseBody.url);
    }

    if (code === 408) {
      // 账号不存在
      antdMessage.error('用户不存在')
    } else if (code === 409) {
      // 用户密码错误
      antdMessage.error('用户密码错误')
    } else {
      antdMessage.error(message)
    }

    return Promise.reject(error);
  } else {
    message && antdMessage.success(message)
  }

  return data;
});

export default fetch;
