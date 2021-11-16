/**
 * SearchForm 组件的配置信息
 * 整体配置和 ant-design-vue 保持一致
 *
 * ***使用示例***（前提是组件已经全局挂载了）
 * 参考：src\views\policyDocument\components\policyList\policyList.vue
    <SearchForm
        :isReset="true"
        :form="formModels"
        :loading="loading"
        :modalInline="true"
        :submit="submitSearch"
    />
 *********************************************************************
 * ***参数配置***
    :isReset="true" // 是否显示重置按钮
    :form="formModels" // form 配置项，详见下面类型声明
    :loading="loading" // 显示 loading
    :modalInline="true" // 是否 Modal 中内嵌
    :submit="submitSearch" // 该方法会返回表单的参数信息
 *********************************************************************
 * ***注意事项***
 * 自带 padding 请把页面的 padding 和 margin 去掉
 *********************************************************************
 * ***类型声明入下***
 */
/**
 * form 配置信息
 * form 为数组！！！
 */
export interface SearchFormConfig {
    /**
     * 输入框的 label 值
     */
    label: string;
    /**
     * 输入框的绑定字段值，submit 会返回改值的集合对象
     */
    key: string;
    /**
     * 输入框的类型
     * 默认为空,支持类型如下
     * select   cascader    dateTime    input   range   slot
     */
    type: string;
    /**
     * 初始默认值
     */
    defaultValue?: string | number | string[] | number[];
    /**
     * 占位符
     */
    placeholder?: string | number | string[] | number[];
    /**
     * 插槽，使用特殊输入框时使用
     * index // 索引
     * item // 配置项值
     * form 绑定的表单对象
     */
    scopedSlots?: { customRender: string };
    /**
     *  @change 事件
     */
    onChange?: Function;
    /**
     * *** type 为 cascader 时 ***
     * field-names 自定义字段名
     */
    fieldNames?: { label: string; value: string | number; children: string };
    /**
     * *** type 为 range-picker 时 ***
     * 时间禁用范围
     */
    disabledDate?: Function;
    /**
     * *** type 为 range-picker 时 ***
     * 是否隐藏“今天”按钮
     */
    hideToday?: boolean;
    /**
     * *** type 为 select 时 ***
     * 下拉列表数据
     */
    options?: any[];
    /**
     * *** type 为 select 时 ***
     * 下拉列表数据的配置项
     */
    config?: {
        /**
         * select-option 的 key、value 会绑定该值
         * 默认为 dictKey
         */
        dictKey?: string;
        /**
         * select-option 的 labele 显示的值
         * 默认为 dictLabel
         */
        dictLabel?: string;
        /**
         * select-option 的 labele 显示的值
         * 会以括号的形式显示
         * 默认为 dictLabel2
         * 示例：dictLabel(dictLabel2)
         */
        dictLabel2?: string;
        /**
         * *** type 为 select-opt-group 时 ***
         * 下拉列表数据的子级列表属性名 key
         * 默认为 children
         */
        children?: string;
    };

    /**
     * 以后根据需求再加
     */
}
/**
 * 是否显示重置按钮
 */
export type IsReset = boolean;
/**
 * 该方法会返回表单的参数信息
 */
export type Submit = Function;
/**
 *  显示 loading
 */
export type Loading = boolean;
/**
 *  是否 Modal 中内嵌
 */
export type ModalInline = boolean;
