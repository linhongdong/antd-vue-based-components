/**
 * 参考 ant-desagin-vue 中 table columns 的配置，全部支持
 */
export type TableFormDitable = boolean; // 是否禁用状态，详情页用
export interface TableFormColumns {
    [key: string]: any;
    /**
     * 输入框的类型
     * 默认为 input 支持类型如下
     * input    number    select    tree-select     date
     */
    type?: string;
    /**
     * 名字，用来校验表单字段（要提交数据的字段名）
     */
    tableName?: string;
    /**
     * table title 的 label
     */
    title: string;
    /**
     *  table 的 key 及 dataIndex
     */
    key: string;
    dataIndex: string;
    /**
     * 初始默认值
     */
    defaultValue?: string | number | string[] | number[];
    /**
     * 插槽，支持自定义
     */
    scopedSlots?: { customRender: string };
    /**
     * 输入框校验项，参考 ant-desagin-vue 的校验项
     */
    rules?: { required: boolean; message: string; trigger: string } | any;
    /**
     * type 为 input 框的的最大输入长度
     */
    maxLength?: number;
    /**
     * type 为 number
     * 最大值，最小值
     */
    min?: number;
    max?: number;
    /**
     * type 为 number
     * 精度
     */
    precision?: number;
    /**
     * type 为 number
     * 支持行不同的精度精度
     */
    precisions?: number[];
    /**
     * 参考 ant-desagin-vue 的 table 配置项
     * https://github.com/vuejs/babel-plugin-transform-vue-jsx
     * 返回如下 calss 可以用来给 title 添加必填红色 *
     * return {
            class: {
                'table-form-label-required': true,
            },
        };
     */
    customHeaderCell?: Function;
    /**
     *  @change 事件
     */
    onChange?: Function;
    /**
     * *** type 为 date 时 ***
     * 是否隐藏“今天”按钮
     */
    hideToday?: boolean;
    /**
     * *** type 为 date 时 ***
     * 时间禁用范围
     */
    disabledDate?: Function;
    /**
     *  列宽，默认 100%
     */
    width?: number | string;
    /**
     * 对齐方式
     */
    align?: string;
    /**
     * 固定列
     */
    fixed?: string;
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
         * 回显的字段名一般设置为 key 就可以，或者对应的 name
         */
        label?: string;
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
        // /**
        //  * select-option 的 labele 显示的值
        //  * 会以括号的形式显示
        //  * 默认为 dictLabel2
        //  * 示例：dictLabel(dictLabel2)
        //  */
        // dictLabel2?: string;
        // /**
        //  * *** type 为 select-opt-group 时 ***
        //  * 下拉列表数据的子级列表属性名 key
        //  * 默认为 children
        //  */
        // children?: string;
    };
}
