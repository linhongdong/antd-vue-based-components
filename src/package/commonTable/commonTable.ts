import { getPagination } from '../../commons/utils';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import TableOperationPopover from './tableOperationPopover.vue';
/**
 * Created by lhd on 2021-08-04 15:31:36
 */
@Component
export default class CommonTable extends Vue {
    /**
     * table 配置项
     */
    @Prop({ default: () => [] })
    private columns!: any;
    /**
     * table 数据源
     */
    @Prop({ default: () => [] })
    private dataSource!: any;
    /**
     * table loading
     */
    @Prop({ default: false })
    private loading!: boolean;
    /**
     * table 列表项可选择配置
     */
    @Prop({ default: null })
    private rowSelection!: any;
    /**
     * table 指定树形结构的列名
     */
    @Prop({ default: '' })
    private childrenColumnName!: string;
    /**
     * table 初始时，是否展开所有行
     */
    @Prop({ default: false })
    private defaultExpandAllRows!: boolean;
    /**
     * table 展开的图标显示在哪一列，如果没有 rowSelection，默认显示在第一列，否则显示在选择框后面
     */
    @Prop({ default: 0 })
    private expandIconColumnIndex!: number;
    /**
     * table rowKey 每项的唯一标识
     */
    @Prop({ default: () => (record: any, index: number) => record?.id || index })
    private rowKey!: Function;
    /**
     * table 设置行属性
     */
    @Prop({ default: () => () => ({}) })
    private customRow!: Function;
    /**
     * table 设置头部行属性
     */
    @Prop({ default: () => () => ({}) })
    private customHeaderRow!: Function;
    /**
     * table 列宽是否可调节
     */
    @Prop({ default: true })
    private resizable!: boolean;
    /**
     * table 是否显示分页器
     */
    @Prop({ default: true })
    private isPagination!: boolean;
    /**
     * table 总条数，分页用过
     */
    @Prop({ default: 0 })
    private total!: number;
    @Watch('total')
    private watchTotal(val: number) {
        this.pagination.total = val | 0;
    }
    /**
     *搜索回调
     */
    @Prop({ default: () => false })
    private submit!: Function;
    /**
     * table 分页
     */
    private form = {};
    private pagination: any = getPagination(this.form, this.submit);
    // private get pagination() {
    //     const p = getPagination(this.searchForm, this.submit);
    //     p.total = this.total;
    //     return p;
    // }
    /**
     * 获取要生成的 slot 插槽列表
     */
    private getSlotList(columns = []) {
        // return columns
        //     .filter((item: any) => item?.scopedSlots?.customRender)
        //     .map((item: any) => item?.scopedSlots?.customRender);
        return columns.reduce((list: any[], item: any) => {
            // item.ellipsis = true;
            // this.$set(item, 'ellipsis', true);
            const slotName = item?.scopedSlots?.customRender;
            if (slotName) list.push(slotName);
            return list;
        }, []);
    }
    /**
     * 当前列
     */
    private currentColumns = this.columns;
    /**
     * 筛选列
     */
    private filterColumns(columns: any) {
        this.currentColumns = columns;
    }
    /**
     * 操作添加功能项
     */
    private handleOperation(h: any, props: any, children: any) {
        return h(
            TableOperationPopover,
            { ...props, props: { columns: this.columns, filterColumns: this.filterColumns } },
            [...children],
        );
        // return h('th', { ...props }, [...children]);
    }
    /**
     * 支持 table 列可调节
     * 注意：列宽必须有值才行！！！
     */
    private components: any = false; // 不能是 undefined 否则会报错
    private getResizeableTitle() {
        const draggingMap: any = {};
        this.columns.forEach((col: any) => {
            draggingMap[col.key] = col.width || 250;
        });
        const draggingState = Vue.observable(draggingMap);
        const resizeableTitle = (h: any, props: any, children: any) => {
            let thDom: any = null;
            const { key, ...restProps } = props;
            const col: any = this.columns.find((col: any) => {
                const k = col.key || col.dataIndex;
                return k === key;
            });
            if (key === 'operation') {
                return this.handleOperation(h, props, children);
            }
            if (!this.resizable) {
                return h('th', props, children);
            }
            if (!col || !col.width) {
                return h('th', { ...restProps }, [...children]);
            }
            const onDrag = (x: number) => {
                draggingState[key] = 0;
                col.width = Math.max(x, 1);
            };

            const onDragstop = () => {
                draggingState[key] = thDom.getBoundingClientRect().width;
            };
            const dragProps = {
                key: col.dataIndex || col.key,
                class: 'table-draggable-handle',
                attrs: {
                    // w: 10,
                    x: draggingState[key] || col.width,
                    // z: 1,
                    axis: 'x',
                    draggable: true,
                    resizable: false,
                    onDragging: onDrag,
                    onDragstop: onDragstop,
                },
                on: {
                    dragging: (x: number) => {
                        col.width = Math.max(x, 1);
                    },
                },
            };
            const drag = h('VueDraggableResizable', { ...dragProps });

            return h(
                'th',
                { ...restProps, class: 'resize-table-th', 'v-ant-ref': (r: any) => (thDom = r), width: col.width },
                [...children, drag],
            );
        };
        return resizeableTitle;
    }
    /**
     * 自定义展开图标
     */
    expandIcon(props: any) {
        // expanded-是否可展开, onExpand-展开事件默认, record-每一项的值 设置自定义图标
        const { expanded, onExpand, record } = props;
        const c = record?.childrenList;
        const p = {
            class: 'iconfont',
            style: { marginRight: '8px', cursor: 'pointer' },
            on: { click: (e: any) => onExpand(record, e) },
        };
        if (!c || c.length < 1) {
            return this.childrenColumnName ? this.$createElement('span', p, '\u00A0\u00A0\u00A0') : '';
        }
        return this.$createElement('span', p, expanded ? '' : '');
    }

    /**
     * 生命周期 挂载完成
     */
    private mounted() {
        console.log('operation', this);
        this.components = {
            header: {
                // cell: 'th',
                cell: this.getResizeableTitle(),
            },
            // body: {
            //     cell: 'td',
            // },
        };
        if (!this.isPagination) this.pagination = false;
    }
}
