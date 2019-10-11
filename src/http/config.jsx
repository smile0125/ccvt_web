import axios from 'axios';
import {message} from 'antd';

//拦截请求
axios.interceptors.request.use((config) => {
    message.loading('loading...');
    console.log('...loading');
    return config;
});

//响应请求
axios.interceptors.response.use((response) => {
    message.destroy();
    console.log('...end');
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});