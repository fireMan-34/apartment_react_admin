import axios from 'axios';
import { message } from 'antd';

const METHOD_TYPE = {
    get: "get",
    post: "post",
    put: "put",
    delete: "delete"
}

class interceptors {

    /**
     * 
     * @param {Object} interceptors 实例化的请求响应拦截器对象
     * @param {(config: AxiosRequestConfig) =>config} interceptors.requestInterceptors 请求处理方法
     * @param {error =>{}} interceptors.requestInterceptorsCatch 请求异常处理方法
     * @param {(config: AxiosResponseConfig) =>config} interceptors.responseInterceptors 响应处理方法
     * @param {error =>{}} interceptors.responseInterceptorsCatch 响应异常处理方法
     * 
     */
    constructor({ requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch }) {
        this.requestInterceptors = requestInterceptors;
        this.requestInterceptorsCatch = requestInterceptorsCatch;
        this.responseInterceptors = responseInterceptors;
        this.responseInterceptorsCatch = responseInterceptorsCatch;
    }
}
class Request {
    constructor(config) {
        this.instance = axios.create(config);
        this.interceptors = config.interceptors;
        this.instance.interceptors.request.use(
            req => {
                // console.log('全局亲求拦截');
                return req;
            },
            error => error
        )
        //实例化响应和拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptors,
            this.interceptors?.requestInterceptorsCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptors,
            this.interceptors?.responseInterceptorsCatch
        )
        this.instance.interceptors.response.use(
            res => {
                // console.log(`全局响应器`);
                return res.data;
            })
    }
    request(config) {
        return this.instance.request(config);
    }
};

//实例化
const simpleRequest = new Request({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 60,

    // interceptors: new interceptors({}),
});

const commonRequest = async (
    loadingState = { isLoading, setIsLoading, },
    orginDataTransformToRequest = {
        request: (data, config) => { },
        data,
        config: {},
    }
) => {
    const { isLoading, setIsLoading } = loadingState;
    if (isLoading) {
        message.info("正在上传数据请稍后尝试");
        return;
    }
    setIsLoading(true);
    const { request, data, config = {} } = orginDataTransformToRequest;
    ;
    const { success, info, ...successRequestObj } = await request(data, config);
    message.info(info);
    if (!success) return;
    setIsLoading(false);
    return successRequestObj;
}

export { METHOD_TYPE, interceptors, Request, simpleRequest, commonRequest };