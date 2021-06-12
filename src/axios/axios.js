import config from '@/config/config';
import _ from 'lodash';
// import antdTheme from '../../antdTheme';
import { message, Modal } from 'antd';
import loadingState from '@com/apiLoading/index.state';
import { removeToken, getToken, getUmid } from '@utils/auth';
import axios from 'axios';
// import '../mock/mock';

// 创建axios实例
const service = axios.create({  //这个service是自定义（你自己起的名字）
    baseURL: config.BASE_URL,
    timeout: 10000, // 请求超时时间
    // headers: {'X-Custom-Header': 'foobar'}
});

const handleNotAuthorized = _.throttle(() => {
    Modal.warn({
        title: "提示",
        content: "账户无权限，请联系***开通权限",
        onOk() {
            // 重定向至登录页面
            removeToken();
            // redirectToLogin();
        }
    });
}, 10000);

// 通讯超时处理
// const handle401 = _.throttle(() => {
//     if (process.env.REACT_APP_STAGE === "production") {
//         // 生产环境直接重定向至登录页面
//         removeToken();
//         // redirectToLogin();
//     } else {
//         Modal.warn({
//             title: "提示",
//             content: "登录超时，请重新登录",
//             keyboard: false,
//             onOk() {
//                 // 重定向至登录页面
//                 removeToken();
//                 // redirectToLogin();
//             }
//         });
//     }
// }, 10000);

// 接口错误处理
const handleError = _.throttle((errorMessage) => {
    // 生产环境不弹出错误提示框
    if (process.env.NODE_ENV !== "production") {
        message.error(errorMessage);
    }
}, 3500);

//http request 拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = getToken();
        }
        if (getUmid()) {
            config.headers['Umid'] = getUmid();
        }
        // console.log("showLoading");
        loadingState.showLoading();
        return config;
    },
    error => {
        _.throttle(() => { loadingState.hideLoading(); }, 500);
        // 对请求错误做些什么
        console.log("axios interceptors.request error:", error);
        return Promise.reject(error);
    }
);

//http response 拦截器
//简单点说就是每次得到数据前都要经过这里
service.interceptors.response.use(
    response => {
        // 能进入这里，一定是：response.status === 200；有错误也是业务层面的错误
        const data = response.data;
        loadingState.hideLoading();
        // console.log("resdata:", data);
        if (data.status !== 0) {
            // 业务错误，status为非0；开发环境下额外弹信息框提示一下
            handleError(data.messageCode);
            return data;
        } else {
            return data;
        }
    },
    error => {
        console.log(error);
        // 能进入这里，一定是：error.response.status != 200
        loadingState.hideLoading();
        if (error && error.response) {
            const resStatus = error.response.status
            // token 校验失败则需要触发回到登录页面
            if (resStatus === 403) {
                handleNotAuthorized();
            } else {
                handleError(error.message);
                console.log("网络访问出错1：" + error);
                return Promise.reject(error);
            }
        } else {
            handleError(error.message);
            console.log("网络访问出错2：" + error);
            return Promise.reject(error);
        }

    }
);

export default service;

