import Vue from 'vue';
import { Moment } from 'moment';
/**
 * 获取窗口可见区域大小信息
 */
export const getWindowSizeInfo = () => {
    return {
        width: window.innerWidth || window.document.body.clientWidth || window.document.documentElement.clientHeight,
        height: window.innerHeight || window.document.body.clientHeight || window.document.documentElement.clientHeight,
    };
};
/**
 * 图片加载
 * @param url 图片地址
 * @return HTMLImageElement
 */
export function loadImage(url: string) {
    // return new Promise((resolve: (value: HTMLImageElement) => void, reject) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        try {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                resolve(img);
            };
        } catch (error) {
            reject(error);
        }
    });
}
/**
 * 日期时间格式化，支持任何类型数据，转换成 Date 类型失败后会返回 ''
 * @param {string} fmt - 格式：YYYY-mm-dd HH:MM:SS
 * @param {string} date - 返回：2222-22-22 22:22:22
 */
export function dateFormat(fmt: string, date: any) {
    if (!(date instanceof Date)) {
        if (!date) return '';
        if ('number' === typeof date) {
            date = new Date(date); // 时间戳
        } else {
            date = date.replace(/\-/g, '/'); // 兼容 iOS 时间转换
            date = new Date(date); // 支持字符串
        }
    }
    if (isNaN(date.getTime())) return '';
    let ret;
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'D+': date.getDate().toString(), // 日
        'h+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            const key = k as keyof typeof opt;
            fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[key] : opt[key].padStart(ret[1].length, '0'));
        }
    }
    return fmt;
}
/**
 * 异步睡觉器
 * @param duration 睡觉的毫秒数
 */
export async function asyncSleep(duration: number) {
    await new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}
/**
 * 获取范围内的随机数整数
 * @param min 最大边界值
 * @param maxs 最小边界值
 */
export function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}
/**
 * 设置跟节点 fonst-size
 */
export const setRootHtmlFontSize = () => {
    const rootHtmlDOM = document.getElementsByTagName('html')[0];
    const w = rootHtmlDOM.offsetWidth;
    const fs = Math.round((w / 1920) * 10 * 10) / 10;
    rootHtmlDOM.style.fontSize = `${fs}px`;
    Vue.prototype.$rootFontSize = fs;
};

/**
 * 获取跟节点 fonst-size
 */
export const getRootHtmlFontSize = () => {
    const rootHtmlDOM = document.getElementsByTagName('html')[0];
    return parseInt(rootHtmlDOM.style.fontSize || '10');
};

const filter = (str: string): string => {
    // 特殊字符转义
    str += ''; // 隐式转换
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str;
};
/**
 * 将对象转换为url参数
 */
export function formateObjToParamStr(paramObj: any) {
    const sdata = [];
    for (const attr in paramObj) {
        if (paramObj[attr] !== '') {
            sdata.push(`${attr}=${filter(paramObj[attr])}`);
        }
    }
    return sdata.join('&');
}
/**
 * 格式化日期时间（moment）为字符串
 * @param {Moment} date - 要格式化的日期，moment 根据传入的 format 格式化成相应的 字符串，否则返回 ''
 * @param {string} format - 格式：YYYY-mm-dd HH:MM:SS
 * @return {string} date - 返回：2222-22-22 22:22:22 | ''
 */
export function momentFormat(date: Moment | string | null | undefined, format: string) {
    if (!date) return '';
    if ('string' === typeof date) return date;
    const moment = date as Moment;
    return moment?.format ? moment.format(format) : '';
}
/**
 * @param url 请求地址
 * @return url  完整的请求地址
 */
export function getUrl(Config: any, url: string): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    } else if (url.startsWith('/emer-')) {
        // 如果带前缀，则使用前缀
        return Config.apiBaseAddress + url;
    } else {
        return Config.apiBaseUrl + url;
    }
}

/**
 * 去除前后空格
 * @param obj 表单对象
 * @param key 表单 key 值
 */
export function trimSpace(obj: { [x: string]: string }, key: string) {
    if (!obj) return;
    if ('string' === typeof obj[key]) obj[key] = obj[key].trim();
}

/**
 * 格式化数字三位用,号隔开
 * @param value 值
 */
export function formatNumberDelimiter(value: string | number) {
    if (!value) return value;
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function deleteEmptyArray(dataList: any[]) {
    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].childrenList && dataList[i].childrenList.length > 0) {
            deleteEmptyArray(dataList[i].childrenList);
        } else {
            dataList[i].childrenList = null;
        }
        if (dataList[i].childrenListAll && dataList[i].childrenListAll.length > 0) {
            deleteEmptyArray(dataList[i].childrenListAll);
        } else {
            dataList[i].childrenListAll = null;
        }
    }
}
// 前端生成uuid
export function getUuid(): string {
    const s: any = [];
    const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
}
// 格式化金额,保留两位小数
export function formatterMoney(num: any) {
    if (num && num != null) {
        num = String(num);
        const left = num.split('.')[0];
        let right = num.split('.')[1];
        right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
        const temp = left
            .split('')
            .reverse()
            .join('')
            .match(/(\d{1,3})/g);
        return (Number(num) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
    } else if (num === 0) {
        // 注意===在这里的使用，如果传入的num为0,if中会将其判定为boolean类型，故而要另外做===判断
        return '0.00';
    } else {
        return '';
    }
}
