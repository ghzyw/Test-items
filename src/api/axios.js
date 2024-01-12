import axios from 'axios'

const axios_base = axios.create({
  // baseURL: 'http://192.168.118.129:5000',
  timeout: 5000,
})

// 添加请求拦截器
axios_base.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios_base.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { code, data, message } = response.data;
    if (code === 200) return data;
    else return 'error'
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default function my_axios(url,method,data) {
  return axios_base({
    method: method,
    url: url,
    data: data
  })
}