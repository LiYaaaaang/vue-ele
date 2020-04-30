import axios from 'axios'
// import qs from 'qs'

import {
    Indicator
} from 'mint-ui';
//创建axios实例
const service = axios.create({
    // timeout: 5000
})
//设置请求根路径
// service.defaults.baseURL = 'https://ele-interface.herokuapp.com/'
//添加请求拦截器
service.interceptors.request.use(
    config => {
        //因为原来的post请求变成了OPTIONS，所以可以用qs来转换
        // if (config.method == 'post') {
        //     config.data = qs.stringify(config.data);
        // }
        // 加载动画
        Indicator.open();
        return config
    },
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
        Indicator.close();
        return response
    },
    error => {
        // 错误提醒
        Indicator.close();
        return Promise.reject(error);
    }
)

export default service