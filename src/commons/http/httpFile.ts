import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { LocalStorage, getUrl, getFileExt } from '../../commons/utils';
import { ResOutDto } from './http';
import Config from '../../config';
import moment from 'moment';
/**
 * 获取文件名
 */
function getFileName(url: string, { fileName }: any, res: AxiosResponse) {
    if (fileName) {
        const ext = `${fileName}`.split('.');
        if (ext.length > 1 && ext[ext.length - 1]) {
            return fileName;
        }
    }
    const filePaths = (url || '').split('/');
    const last = filePaths[filePaths.length - 1] || '';
    const n = last.split('.');
    if (n.length > 1 && n[n.length - 1]) {
        return last;
    }
    const { data } = res || {};
    // const { data, headers = {} } = res || {};
    // const fName = headers['content-disposition'];
    // if (fName) {
    //     return fName;
    // }
    const arr8 = data?.slice(0, 4);
    const int8Array = new Int8Array(arr8 || 4);
    return `${fileName}-${moment().format('YYYY-MM-DD')}${getFileExt(int8Array.join(' '))}`;
}
/**
 * 封装 http 上传文件的服务
 */
class HttpFile {
    /**
     * axios 实例
     */
    private instance: AxiosInstance | null = null;
    /**
     * 使用 form 表单上传文件
     * @param url 请求接口 url
     * @param params 请求参数
     * @param files 文件列表
     * @param config 配置项
     */
    public async uploadFiles(
        url: string,
        files: any[] = [],
        params?: any,
        config?: AxiosRequestConfig,
    ): Promise<ResOutDto> {
        if (!this.instance) {
            this.instance = Axios.create();
        }
        config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'hone-auth': `Bearer ${(LocalStorage.get('userInfo') || {}).accessToken}`,
            },
            method: 'post',
            params: {},
            url: getUrl(Config, url),
            ...config,
        };
        const formData = new FormData();
        if ('object' === typeof params) {
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    const value = params[key];
                    // config.params[key] = value;
                    formData.append(key, value);
                }
            }
        }
        if (files && files.length > 0) {
            files.forEach(file => {
                formData.append('file', file);
            });
        }
        config.data = formData;
        return this.instance
            .request(config)
            .then((res: { data: any }) => res?.data)
            .catch((err: { response: { data: any } }) => {
                const data = err?.response?.data;
                return data || { code: -200, data: null, msg: '上传失败' };
            });
    }
    /**
     * 下载文件
     * @param url 请求接口 url
     * @param params 请求参数
     */
    public async downLoadFile(url: string, params?: any, config?: AxiosRequestConfig): Promise<ResOutDto> {
        params = params || {};
        if (!this.instance) {
            this.instance = Axios.create();
        }

        config = {
            params: {},
            method: 'get',
            timeout: 1200000,
            responseType: 'arraybuffer',
            // responseType: 'blob',
            withCredentials: true,
            url: getUrl(Config, url),
            headers: { 'hone-auth': `Bearer ${(LocalStorage.get('userInfo') || {}).accessToken}` },
            ...config,
        };
        let infoKey = 'params';
        if ('post' === config.method) {
            config.data = {};
            infoKey = 'data';
        }
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const value = params[key];
                (config as any)[infoKey][key] = value;
            }
        }
        return this.instance
            .request(config)
            .then((res: any) => {
                const data = res?.data;
                const fileName = getFileName(url, params, res);
                const blob = new Blob([data]);
                const href = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.textContent = 'download';
                a.download = fileName;
                a.target = '_blank';
                a.href = href;
                // document.body.appendChild(a);
                a.click();
                // document.body.removeChild(a);
                window.URL.revokeObjectURL(href);
                if ('application/json' === data?.type) {
                    return data;
                }
                return { code: 200, data, msg: '下载成功' };
            })
            .catch((err: { response: { statusText: any } }) => {
                return Promise.resolve({ code: -200, data: null, msg: `下载失败：${err?.response?.statusText}` });
                // // return { code: -200, data: response?.data, msg: '下载失败：' + response?.statusText };
            });
    }
    /**
     * 预览文件
     * @param url 请求接口 url
     * @param params 请求参数
     */
    public async previewFile(url: string, params?: any, config?: AxiosRequestConfig): Promise<ResOutDto> {
        params = params || {};
        if (!this.instance) {
            this.instance = Axios.create();
        }
        config = {
            params: {},
            method: 'get',
            timeout: 1200000,
            // responseType: 'blob',
            responseType: 'arraybuffer',
            withCredentials: true,
            url: getUrl(Config, url),
            headers: { 'hone-auth': `Bearer ${(LocalStorage.get('userInfo') || {}).accessToken}` },
            ...config,
        };
        // console.log('config-----------------', config);

        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const value = params[key];
                config.params[key] = value;
            }
        }
        return this.instance
            .request(config)
            .then((res: { data: any }) => {
                const data = res?.data;
                // console.log('res----------------------', res);
                // const fileName = getFileName(url, params, res.data);
                // const blob = new Blob([data]);
                // blob.text().then(res => {
                //     console.log('bolo.txt----------', res);
                // });
                // console.log('bolo.txt----------', blob.stream());
                // console.log('typeof res.data----------', typeof res.data);
                // console.log('res.data----------', res.data);
                // const arr8 = data.slice(0, 8);
                // console.log('arr8--------------', arr8);
                // const int8Array = new Int8Array(arr8 || 8);
                // const codes16: string[] = [];
                // int8Array.forEach(value => {
                //     codes16.push(value.toString(16));
                // });
                // console.log('int8Array', int8Array);
                // console.log('codes16', codes16);
                // console.log('int8Array', int8Array.join(' '));

                // console.log(
                //     'int8Array--------------',
                //     int8Array.map(code => code + code),
                // );
                // console.log('uint16Array--------------', int8Array));
                // console.log(
                //     'arr8--------------',
                //     arr8.map((code: number) => code.toString(16)),
                // );
                // .arrayBuffer()
                // .then(res => {
                //     console.log('arrayBuffer--8----', res);
                //     // const uint8Array = new Uint8Array(res);
                //     const int16Array = new Int16Array(res);
                //     console.log('uint8Array', int16Array);
                // });
                // const reader = new FileReader();
                // reader.readAsBinaryString(blob);
                // reader.readAsDataURL(blob);
                // reader.onload = e => {
                //     const result = e?.target?.result || '';
                //     console.log('result----', result);
                //     // const int16Array = (result as string).charCodeAt(0).toString(16);
                //     // console.log('uint8Array', int16Array);
                //     // console.log('%PDF-1.7', '%PDF-1.7'.charCodeAt(0).toString(16));
                //     // window.open(
                //     //     'http://oss.hd.cosmoplat.com/hdCosmo21:yjwz-public/emer-product-web/%E4%BE%9B%E5%BA%94%E5%95%86%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls',
                //     // );
                //     const dom = document.createElement('embed');
                //     // dom.type = 'application/pdf';
                //     dom.style.width = '500';
                //     dom.style.height = '1000';
                //     // dom.src = result as string;
                //     document.body.appendChild(dom);
                // };
                // const href = window.URL.createObjectURL(blob);
                // console.log('href--', href);
                // const a = document.createElement('a');
                // a.textContent = 'download';
                // a.download = fileName;
                // a.target = '_blank';
                // a.href = href;
                // // document.body.appendChild(a);
                // a.click();
                // // document.body.removeChild(a);
                // window.URL.revokeObjectURL(href);
                // const reader = new FileReader();
                // reader.readAsBinaryString(blob);
                // reader.onload = e => {
                //     const result = e?.target?.result;
                //     // window.open(result);
                // };
                if ('application/json' === data?.type) {
                    return data;
                }
                const { code } = data || {};
                if (code) {
                    return data;
                }
                return { code: 200, data: res.data, msg: '下载成功' };
            })
            .catch((err: { response: { statusText: any } }) => {
                console.log(err);
                console.log(err?.response);
                // window.open(url);
                return Promise.resolve({ code: -200, data: null, msg: `下载失败：${err?.response?.statusText}` });
                // return { code: -200, data: response?.data, msg: '下载失败：' + response?.statusText };
            });
    }
}

export default new HttpFile();
