import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import {getCookie} from '@/utils/index.ts'
//利用axios.create方法创建一个axios实列：可以设置基础路径、超时的时间设置
const request: AxiosInstance = axios.create({
  baseURL: "/api", //请求的基础路径的设置
  timeout: 5000, //超时的时间的设置，超出5秒就是失败的
});
//请求拦截器
request.interceptors.request.use(
  (config:any) => {
    //config:请求拦截器回调注入的对象（配置对象），配置对象的身上最终要的一件事headers属性
    if(getCookie('token')){
      config.headers.token=getCookie('token')
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

//响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    //处理http网络请求
    let status = error.response.status;
    switch (status) {
      case 400:
        ElMessage({
          type: error,
          message: "请求失败路径出现问题",
        });
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: error,
          message: "服务器挂了",
        });
        break;
      case 401:
        ElMessage({
          type: error,
          message: "参数有误",
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);
//务必对外暴露axios
export default request;
