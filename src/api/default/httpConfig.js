import axios from 'axios' // 引入axios
// import { ErrorType } from '@/api/default/constants';
import {
    storeToRefs
} from 'pinia';
import {
    useUserLoading
} from '@/stores/loading';
import {
    usedataStore
} from '@/stores/fetchData';

// 2分鐘(min) = 120000毫秒(ms)
// axios.defaults.timeout = 30000;
axios.defaults.timeout = 30000;

//timeout 後全域性的請求次數，請求的間隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // 如果配置不存在或未設置重試選項，則拒絕
    if (!config || !config.retry) return Promise.reject(err);
    // 設置變量以跟踪重試次數
    config.__retryCount = config.__retryCount || 0;
    // 檢查我們是否已經達到了重試的總次數
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    // 增加重試次數
    config.__retryCount = 1;
    // 創建新的承諾來處理指數退避
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    //返回調用axios重試請求的promise
    return backoff.then(function() {
        return axios(config);
    });
});

// 请求拦截器
axios.interceptors.request.use(
    config => {
        const useLoading = useUserLoading();
        const {
            isLoading,
            isLoadings
        } = storeToRefs(useLoading);
        useLoading.loading();
        isLoading.value = true
        isLoadings.value = true
        // refCount.value = 1
        // console.log('API前', config);
        return config
    },
    error => {
        const useData = usedataStore();
        const {
            noInformation
        } = storeToRefs(useData);
        isLoading.value = false
        isLoadings.value = false
        noInformation.value = false
        return error
    })

// // // 响应拦截器
axios.interceptors.response.use(
    // 服务码是200的情况
    response => {
        const useLoading = useUserLoading();
        const {
            isLoading
        } = storeToRefs(useLoading);
        useLoading.loading();
        isLoading.value = false
        // refCount.value = 0
        // console.log('API後', response);
        return response;
    },
    // 服务器状态码不是200的情况 message
    error => {
        const {
            isLoadings,
            isLoading
        } = storeToRefs(useLoading);
        const useData = usedataStore();
        const {
            noInformation
        } = storeToRefs(useData);
        isLoading.value = false
        isLoadings.value = false
        noInformation.value = false
        if (axios.isCancel(error)) {
            console.log("已取消的重複請求：" + error);
        } else {
            // 添加異常處理
            console.log('添加異常處理', error.message);
        }
        console.log('status', error.response.status);
        // 服务器状态码不是200的情况
        if (error.response.status) {
            switch (error.response.status) {
                // 404请求不存在
                case 400:
                    console.log('API_Loading過重-400');
                    break;
                    // 404请求不存在
                case 404:
                    console.log('網絡請求不存在-404');
                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    console.log(error.response.data.message);
            }
        }
        return error;
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时url后直接加的参数，默认为空]
 */
export function get(url, params, config = {
    add: ''
}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }, config).then(res => {
            resolve(res.data)
            // setTimeout(function() {
            //     resolve(res.data)
            // }, 1000);
        }).catch(err => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('err.data', err.response.data);
                console.log('err.status', err.response.status);
                console.log('err.headers', err.response.headers);
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error.message', err.message);
            }
            console.log(err.config);
            reject(err.data)
        })
    })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [是否启用multipart/form-data格式请求，默认为false]
 */
export function post(url, params, config = {
    isUpload: false
}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}