/**
 * 配置文件
 */
export default class Config {
    /**
     * 接口调用基础URL
     */
    static apiBaseUrl = `${process.env.VUE_APP_APIBASEURL}/${process.env.VUE_APP_APIPREFIX}/`;
    /**
     * 接口调用基础地址
     */
    static apiBaseAddress = process.env.VUE_APP_APIBASEURL;
    /**
     * 接口调用基础前缀
     */
    static apiPrefix = process.env.VUE_APP_APIPREFIX;
    /**
     * 未登录拦截到 403 页面
     */
    static routerPathsPage403 = '/403';
    /**
     * 拦截到 404 页面
     */
    static routerPathsPage404 = '/404';
    /**
     * vue 实例
     */
    static vue: Vue | any;
}
