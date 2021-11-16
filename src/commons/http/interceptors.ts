import { LocalStorage } from './../utils/localStorage';
/**
 * 封装 axios 拦截
 */
import Axios from 'axios';
import Config from '../../config';
/**
 * 防止重复提交，利用axios的cancelToken
 */
// const pending: any[] = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// const CancelToken: any = Axios.CancelToken

// const removePending: any = (config: any, f: any) => {
//     // 获取请求的url
//     const flagUrl = config.url
//     // 判断该请求是否在请求队列中
//     if (pending.indexOf(flagUrl) !== -1) {
//         // 如果在请求中，并存在f,f即axios提供的取消函数
//         if (f) {
//             f('取消重复请求') // 执行取消操作
//         } else {
//             pending.splice(pending.indexOf(flagUrl), 1) // 把这条记录从数组中移除
//         }
//     } else {
//         // 如果不存在在请求队列中，加入队列
//         if (f) {
//             pending.push(flagUrl)
//         }
//     }
// }
/**
 * 创建axios实例
 */
const service = Axios.create({
    // baseURL: Config.apiBaseUrl, // 基础地址 要请求的url前缀
    // baseURL: window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__, // 基础地址 要请求的url前缀
    timeout: 60000, // 请求超时时间
});
/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
    (config: { method?: any; params?: any; data?: any; url?: any; headers?: any }) => {
        // config.params &&
        //     vm.vue?.$logger.log(`${config.method} 接口 ${config?.url} 请求入参: `)(JSON.stringify(config.params));
        // config.data &&
        //     vm.vue?.$logger.log(`${config.method} 接口 ${config?.url} 请求入参: `)(JSON.stringify(config.data));
        if ('get' === config.method) {
            /**
             * 因后端限制，传空值会被当做空值条件去查询，所以在此处进行过滤 undefined 和 ''
             */
            const { params } = config || {};
            const values = {} as any;
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    const value = params[key];
                    if (undefined !== value && '' !== value) {
                        values[key] = value;
                    }
                }
            }
            config.params = values;
        }

        // neverCancel 配置项，允许多个请求
        // if (!config.neverCancel) {
        //     // 生成cancelToken
        //     config.cancelToken = new CancelToken((c: any) => {
        //         removePending(config, c)
        //     })
        // }
        // 在发送请求之前先执行一些操作
        // const token = localStorage.getItem('token')
        // config.headers['Authorization'] = `Bearer ${token}`
        if ('post' === config.method) {
            config.data = {
                // userID: localStorage.getItem('userID'),
                ...config.data,
            };
        }
        // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
        const userInfo = LocalStorage.get('userInfo');
        if (
            userInfo &&
            config.url?.indexOf('emer-auth/token') === -1 &&
            config.url?.indexOf('menuConfig.json') === -1
        ) {
            config.headers['hone-auth'] = 'Bearer ' + userInfo.accessToken; // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
    },
    (error: any) => {
        // 对请求错误做些什么
        // vm.vue?.$logger.log('requestError ===>>>')(error);
        return Promise.reject(error);
    },
);
/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
    (response: any) => {
        const vue = Config.vue;
        // 移除队列中的该请求，注意这时候没有传第二个参数f
        // removePending(response.config)
        // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
        // if (response.status !== 200) {
        //     alert(1)
        //     if (response.status === 401) {
        //         if (location.hash === '#/') {
        //             return response
        //         } else {
        //             location.href = '/#/'
        //         }
        //     }
        //     return Promise.reject('error')
        // } else {
        //     return response
        // }
        const resData = response?.data;
        resData && vue?.$logger.log(`接口 ${response?.config?.url} 返回结果: `)(JSON.stringify(resData));
        // 考虑到接口返回不应为空，所以全局处理，抛出未知错误
        if (!resData) {
            return { code: -200, data: null, message: '未知错误' };
        }
        // 成功后自定义的状态拦截
        switch (resData?.code) {
            case 203:
                break;
            case 500:
                break;
            case 404:
                break;
            default:
                break;
        }
        return resData;
    },
    (error: { response: any }) => {
        const errRes = error?.response;

        if (!errRes) {
            // Config.vue?.$message.error(error?.msg);
            // vm.vue?.$router.push(RouterPaths.login);
            return Promise.reject(error);
        }
        // 对响应错误做点什么
        // Prompt.toast(error.message)
        switch (errRes?.status) {
            // 各种错误处理
            case 400:
                return Promise.resolve(errRes?.data);
            case 401:
                LocalStorage.clear();
                Config.vue?.$router.push(Config.routerPathsPage403);
                return Promise.resolve(errRes?.data);
            case 403:
                // 用户身份失效，跳转登录
                LocalStorage.clear();
                // vm.vue?.$message.error(errRes?.data?.msg);
                Config.vue?.$router.push(Config.routerPathsPage403);
                return Promise.resolve(errRes?.data);
            case 404:
                return Promise.resolve(errRes?.data);
            case 500:
                // 服务器错误
                return Promise.resolve(errRes?.data);
            // vm.vue?.$message.error(errRes?.data?.msg);
            // break;
            case 502:
                break;
            case 503:
                // 网络异常
                break;
            default:
                break;
        }
        // pending = []
        // if (error.message === '取消重复请求') {
        //     return Promise.reject(error)
        // }

        return Promise.reject(errRes);
    },
);
export default service;
