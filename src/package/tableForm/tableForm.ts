import { Component, Prop, Vue } from 'vue-property-decorator';
import { formatNumberDelimiter } from '../../commons/utils';
import eventListener from '../../commons/utils/eventListener';
import { TableFormColumns } from '.';
/**
 * Created by lhd on 2021-08-24 14:20:59
 */
@Component
export default class TableForm extends Vue {
    private defaultPlaceholder = ['请输入', '请选择'];
    /**
     * 是否禁用
     */
    @Prop({ default: false })
    private editable!: string;
    /**
     * 名字，用来校验表单字段（要提交数据的字段名）
     */
    @Prop({ default: '' })
    private tableName!: string;
    /**
     * table 配置项
     */
    @Prop({ default: () => [] })
    private columns!: TableFormColumns[];
    /**
     * table 数据源
     */
    @Prop({ default: () => [] })
    private dataSource!: any;
    // private dataSource: any[] = [];
    /**
     * table rowKey 每项的唯一标识
     */
    @Prop({
        default: () => (record: any, index: number) => {
            return record?.id || index;
        },
    })
    private rowKey!: Function;
    /**
     * 添加项
     */
    // public add = debounce(this.addItem, 800);
    public add(item: any = {}) {
        setTimeout(() => {
            if (this.validateCurrentRow(-1)) {
                // editable 控制行编辑状态
                this.handleRowEditable(-1);
                this.dataSource.push({ ...this.item, editable: true, ...item });
            }
        }, 300);
    }
    /**
     * 表单字段
     */
    private item: any = {};
    /**
     * 必填字段
     */
    private validateFields: any = [];
    /**
     * 格式化数字
     */
    private formatNumberDelimiter = formatNumberDelimiter;
    /**
     * table 添加操作列
     */
    private addOperation() {
        this.columns.push({
            width: 126,
            title: '操作',
            align: 'right',
            fixed: 'right',
            key: 'operation',
            type: 'operation',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
        });
    }
    /**
     * 获取属性名
     */
    getFieldsName(obj: any, defaultKey: string) {
        return obj?.[defaultKey] || defaultKey;
    }
    /**
     * 获取字段名
     */
    getReplaceFields(config: any) {
        return {
            children: this.getFieldsName(config, 'children'),
            title: this.getFieldsName(config, 'dictLabel'),
            key: this.getFieldsName(config, 'dictKey'),
            value: this.getFieldsName(config, 'dictKey'),
        };
    }
    /**
     * 删除产品
     */
    private deleteProduct(index: number) {
        this.dataSource.splice(index, 1);
    }
    /**
     * 控制行编辑
     */
    private handleRowEditable(index: number) {
        this.dataSource.forEach((item: any, i: number) => {
            if ('editable' in item) {
                item.editable = i === index;
            } else {
                this.$set(item, 'editable', i === index);
            }
        });
    }
    /**
     * 校验必填项
     * @returns boolean
     */
    public validateCurrentRow(clickIndex: number) {
        const index = this.dataSource.findIndex((item: any) => item.editable);
        if (clickIndex === index) return true;
        if (index < 0) return index;
        let valid = true;
        this.validateFields.forEach((field: string) => {
            const rule = (this.$refs?.[`ref_[${index}]_[${field}]`] as any)?.[0];
            rule?.onFieldBlur();
            // rule?.onFieldChange();
            if ('error' === rule?.validateState) valid = false;
        });
        return valid;
    }
    /**
     * 自定义行属性
     */
    private customRow(column: any, clickIndex: number) {
        return {
            on: {
                // 事件 点击行
                click: (event: any) => {
                    event.stopPropagation();
                    if (this.editable) return;
                    if (this.validateCurrentRow(clickIndex)) {
                        this.handleRowEditable(clickIndex);
                    }
                },
            },
        };
    }

    private onChangeSwithItem() {
        // const tableForm = this.$refs.proudctTableForm as TableFormTs;
        const dataSource = this.dataSource || [];
        if (dataSource.length > 0 && this.validateCurrentRow(-1)) {
            const item = dataSource.find((item: any) => item.editable);
            if (item) item.editable = false;
        }
    }
    /**
     * 生命周期 挂载完成
     */
    private mounted() {
        this.columns.forEach((column: any) => {
            const { key, defaultValue, rules, scopedSlots } = column;
            column.scopedSlots = scopedSlots || { customRender: key };
            this.item[key] = defaultValue || undefined;
            if (rules && rules.required) {
                this.validateFields.push(key);
            }
        });

        if (!this.editable && !this.columns.find(column => column.key === 'operation')) {
            console.log('this.editable', this.editable);
            this.$nextTick(() => {
                this.addOperation();
            });
        }
        if (this.editable) return;
        // 在 body 上添加监听事件，实现点击其他地方也能触发校验
        eventListener.addEvent(
            window.document.querySelector('#micro-app') ||
                window.document.querySelector('#app') ||
                window.document.querySelector('#root'),
            'click',
            this.onChangeSwithItem,
        );
    }
    private beforeDestory() {
        if (this.editable) return;
        eventListener.removeEvent(
            window.document.querySelector('#micro-app') ||
                window.document.querySelector('#app') ||
                window.document.querySelector('#root'),
            'click',
            this.onChangeSwithItem,
        );
    }
}
