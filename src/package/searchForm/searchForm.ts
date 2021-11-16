import { FormModel } from 'lhd-ant-design-vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
/**
 * Created by lhd on 2021-08-04 10:55:54
 */
@Component
export default class SearchForm extends Vue {
    private defaultPlaceholder = ['请选择', '请输入'];
    /**
     * 表单项配置
     */
    @Prop({ default: [] })
    private form!: any[];
    /**
     * 表单提交回到
     */
    @Prop({ default: () => ({}) })
    private submit!: Function;
    /**
     * 是否显示重置按钮
     */
    @Prop({ default: true })
    private isReset!: boolean;
    /**
     * 搜索 loading
     */
    @Prop({ default: false })
    private loading!: boolean;
    /**
     * 是否 Modal 中内嵌
     */
    @Prop({ default: false })
    private modalInline!: boolean;
    /**
     * 表单项
     */
    formInline: any = {};
    /**
     * 处理 resetFields 重置 cascader 时，数组不为空的问题
     */
    private cascaders: string[] = [];
    /**
     * 重置
     */
    resetForm() {
        (this.$refs['searchForm'] as FormModel)?.resetFields();
        this.cascaders.forEach(key => (this.formInline[key] = undefined));
        this.submit({ ...this.formInline });
    }
    /**
     * 提交表单
     */
    handleSubmit() {
        // (this.$refs['searchForm'] as FormModel).validate(valid => {});
        this.submit({ ...this.formInline });
    }
    /**
     * 获取属性名
     */
    getAttributesName(obj: any, defaultKey: string) {
        return obj?.[defaultKey] || defaultKey;
    }
    /**
     * 获取列表显示名
     */
    getLabel(option: any, config: any = {}) {
        return config.dictLabel2
            ? `${option[config.dictLabel || 'dictLabel']}(${option[config.dictLabel2 || 'dictLabel2']})`
            : option[config.dictLabel || 'dictLabel'];
    }
    /**
     * 生命周期 挂载完成
     */
    private mounted() {
        this.form.forEach((item: any) => {
            // this.formInline[item?.key] = undefined; // 不是响应式的
            const { key, type, defaultValue } = item;
            this.$set(this.formInline, key, defaultValue || undefined);
            if (type === 'cascader') this.cascaders.push(key);
        });
    }
}
