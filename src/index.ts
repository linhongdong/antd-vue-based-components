import moment from 'moment';
import 'moment/locale/zh-cn';

import Vue, { VueConstructor } from 'vue';
import { version } from '../package.json';
import Config from './config';
/**
 * 自定义组件
 */
import FixedFooter from './package/fixedFooter';
import SearchForm from './package/searchForm';
import CommonTable from './package/commonTable';
import IconButton from './package/iconButton';
import CommonTitle from './package/commonTitle';
import TableForm from './package/tableForm';
import SelectInput from './package/selectInput';
import ImagesUpload from './package/imagesUpload';
/**
 * 第三方库组件
 */
import VueDraggableResizable from 'vue-draggable-resizable';
/**
 * 引入全局样式
 */
import './styles/index.scss';
/**
 * 按需引入 ant-design-vue 相应的组件样式
 */
import './style';
/**
 * 按需引入 ant-design-vue 组件
 */
import {
    message,
    // Form,
    Input,
    InputNumber,
    Button,
    DatePicker,
    Form,
    FormModel,
    Icon,
    Table,
    Tabs,
    Pagination,
    Row,
    Col,
    Select,
    Cascader,
    Popover,
    // Drawer,
    TreeSelect,
    // Tree,
    // Switch,
    Upload,
    Modal,
    Radio,
    Popconfirm,
    ConfigProvider,
    Descriptions,
    Checkbox,
    Spin,
    Tag,
    Badge,
    Tooltip,
} from 'lhd-ant-design-vue';

const components = [
    Input,
    InputNumber,
    Button,
    DatePicker,
    Form,
    FormModel,
    Icon,
    Table,
    Tabs,
    Pagination,
    Row,
    Col,
    Select,
    Cascader,
    Popover,
    TreeSelect,
    Upload,
    Modal,
    Radio,
    Popconfirm,
    ConfigProvider,
    Descriptions,
    Checkbox,
    Spin,
    Tag,
    Badge,
    Tooltip,
    // VueDraggableResizable,
    IconButton,
    SelectInput,
    FixedFooter,
    SearchForm,
    CommonTitle,
    CommonTable,
    TableForm,
    ImagesUpload,
];

export declare class ComponentInstall {
    install(vue: typeof Vue): void;
}

export function install(vue: VueConstructor) {
    components.forEach(component => {
        console.log('install: ', component.name);
        vue.use(component as ComponentInstall);
        // vue.component(component.name, component);
    });

    Vue.prototype.$message = message;
    // Vue.prototype.$notification = notification;
    Vue.prototype.$info = Modal.info;
    Vue.prototype.$success = Modal.success;
    Vue.prototype.$error = Modal.error;
    Vue.prototype.$warning = Modal.warning;
    Vue.prototype.$confirm = Modal.confirm;
    Vue.prototype.$destroyAll = Modal.destroyAll;

    Vue.component('VueDraggableResizable', VueDraggableResizable);
}

/**
 * 消息框配置
 */
message.config({
    // top: `100px`,
    duration: 2,
    maxCount: 3,
});
/**
 * 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
 * 解决 date-picker 组件月份和星期显示英文的问题
 */
moment.locale('zh-cn');
/**
 * 暴露工具类
 */
export * from './commons/http';
export * from './commons/utils';
/**
 * 暴露 ant-design-vue 组件
 */
export * from 'lhd-ant-design-vue';
export { default as LHDAntDesignVue } from 'lhd-ant-design-vue';
/**
 * 暴露 Http 实例
 */
export { default as httpService } from './commons/http';
/**
 * 暴露组件配置
 */
export * from './package/tableForm';
export * from './package/searchForm';
/**
 * 暴露公共配置
 */
export default { version, install, config: Config };
