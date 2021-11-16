import service from './interceptors';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { getUrl } from '../../commons/utils';
import HttpFile from './httpFile';
import Config from '../../config';
/**
 * 封装 http 服务
 */
export class Http {
    /**
     * 封装 get 请求
     * @param url 请求接口 url
     * @param params 请求拼接的参数
     * @param config 配置
     */
    public static get<T = any, R = ResOutDto<T>>(
        url: string,
        params: object = {},
        config?: AxiosRequestConfig,
    ): Promise<R> {
        // get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
        return service.get(getUrl(Config, url), { ...config, params });
    }
    /**
     *
     * 封装 post 请求
     * @param url 请求接口 url
     * @param data 请求参数
     * @param config 配置
     */
    public static post(url: string, data: any = {}, config?: AxiosRequestConfig): Promise<ResOutDto> {
        // post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
        return service.post(getUrl(Config, url), data, config);
    }
    /**
     * 自定义请求
     * @param config 配置
     */
    public static request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return service.request<T>(config);
    }
    /**
     * 使用 form 表单上传文件
     * @param url 请求接口 url
     * @param params 请求参数
     * @param files 文件列表
     */
    public static uploadFiles = HttpFile.uploadFiles;
    /**
     * 下载文件
     * @param url 请求接口 url
     * @param params 请求参数
     */
    public static downLoadFile = HttpFile.downLoadFile;
}

/**
 * 接口数据返回值 response
 */
export interface ResOutDto<T = any> {
    code: number;
    data: T;
    msg: string;
    success: boolean;
}
