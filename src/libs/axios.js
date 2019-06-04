import axios from 'axios'
import {Message} from 'iview'
import Cookies from 'js-cookie'
import {stringify} from 'qs'
import router from './../router';
import { logout } from "./util";

// 统一请求路径前缀
// let base = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev;
const base = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'// 配置post请求头类型
// 超时设定
axios.defaults.timeout = 15000

axios.interceptors.request.use(config => {
  // if (config.method === 'post') {
  //   config.data = stringify(config.data)
  // }
  return config
}, err => {
  Message.error('请求超时')
  return Promise.resolve(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  const data = response.data
  // 根据返回的code值来做不同的处理(和后端约定)
  if (data) {
    switch (data.code) {
      case 302:
        Message.error('未登录');
        // 未登录 清除已登录状态
        logout();
        break;
      case 403:
        // 没有权限
        Message.error('没有权限');
        break
      case 500:
        // 错误
        Message.error(data.msg || '系统处理异常');
        break
      default:
        return data
    }
  }
  return data
}, (err) => {
  if (err.response == undefined) {
    logout();
  }
  // 返回状态码不为200时候的错误处理
  if (err.status == 302) {
    Message.error('登录失效');
    logout();
  } else {
    Message.error(err.toString())
  }
  return {}
})

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
  })
}

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const postJson = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

