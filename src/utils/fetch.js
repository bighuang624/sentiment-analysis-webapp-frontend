import axios from 'axios';
import { Message } from 'iview';

// 创建 axios 实例
const service = axios.create({
    // baseURL: process.env.BASE_API,  // api的base_url
    baseURL: 'http://localhost:5000/',
    timeout: 10000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(config => config, (error) => {
    // console.log(error);
    return Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(response => response.data, (error) => {
    // console.log(`err${error}`);
    Message.error({
        content: '啊哦，你的请求好像出了点小问题。再试一次？',
        duration: 3
    });
    return Promise.reject(error);
});

export default service;