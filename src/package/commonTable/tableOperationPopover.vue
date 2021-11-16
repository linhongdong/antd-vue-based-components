<!--Created by lhd on 2021-08-04 15:31:36-->
<template>
    <!-- <div class="table-operation-popover"> -->
    <a-popover v-model="visible" placement="bottomRight">
        <template slot="content">
            <div class="table-operation-popover-checkbox-group">
                <div class="popover-checkbox-all">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                        <span>表头展示全部分类</span>
                    </a-checkbox>
                </div>
                <a-checkbox-group class="popover-checkbox-group" v-model="checkedList" @change="onChange">
                    <a-checkbox class="checkbox-item" v-for="item in checkboxArr" :key="item.key" :value="item.key">
                        {{ item.title }}
                    </a-checkbox>
                </a-checkbox-group>
                <div class="popover-checkbox-buttons">
                    <div class="clear" @click="empty">
                        <a-button type="link"><span class="clear-text">清空</span></a-button>
                    </div>
                    <a-button type="primary" @click="save">确定</a-button>
                    <a-button @click="cancel">取消</a-button>
                </div>
            </div>
        </template>
        <th class="table-operation-popover" @click="open">
            <slot />
            <span class="text iconfont">&#xe00a;</span>
        </th>
    </a-popover>
    <!-- </div> -->
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
/**
 * Created by lhd on 2021-08-04 15:31:36
 */
@Component
export default class TableOperationPopover extends Vue {
    @Prop()
    private columns!: any;
    @Prop()
    private filterColumns!: Function;
    private visible = false;
    private checkedList = this.columns.map((item: any) => item.key); //  选中项列表，默认全选中
    private indeterminate = false; // 部分选择标识
    private checkAll = true; // 全选标识
    private get checkboxArr() {
        return this.columns.filter((item: any) => item.key !== 'operation');
    }
    /**
     * 选择事件监听
     */
    private onChange(checkedList: any) {
        console.log('checkedList', checkedList);

        this.indeterminate = !!checkedList.length && checkedList.length < this.checkboxArr.length;
        this.checkAll = checkedList.length === this.checkboxArr.length;
    }
    /**
     * 全选
     */
    private onCheckAllChange(e: any) {
        Object.assign(this, {
            checkedList: e.target.checked ? this.checkboxArr.map((item: any) => item.key) : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
    /**
     * 确定筛选
     */
    private save() {
        const c = this.columns.filter((item: any) => this.checkedList.find((key: string) => key === item.key));
        const l = c.length;
        const lastColumns = { ...c.pop() };
        if (l <= 5 && lastColumns.width) {
            // 选择小于等于 5 列的时候把最后一列的宽度去掉，不然后边就空了，蛋疼不
            // 总之一定会出现有空白额现象，要想完全避免，获取宽度自己计算去吧
            delete lastColumns.width;
        }
        // 如果一个都没选就显示全部，不然看着就很蛋疼
        // const currentColumns = l > 0 ? [...c, lastColumns, this.columns[this.columns.length - 1]] : this.columns;
        this.filterColumns([...c, lastColumns, this.columns[this.columns.length - 1]]);
        this.visible = false;
    }
    /**
     * 清空
     */
    private empty() {
        this.checkedList = [];
        this.checkAll = false;
        this.indeterminate = false;
    }
    /**
     * 打开
     */
    private open() {
        this.visible = true;
    }
    /**
     * 取消
     */
    private cancel() {
        this.visible = false;
    }
    /**
     * 生命周期 挂载完成
     */
    private mounted() {
        // ...
    }
}
</script>
<style scoped lang="scss">
.table-operation-popover {
    cursor: pointer;

    .text {
        margin-left: 15px;
        color: #999999;
        line-height: 16px;
    }
}

::v-deep .ant-popover-inner-content {
    padding: 0;
}

.table-operation-popover-checkbox-group {
    width: 432px;

    .popover-checkbox-all {
        padding: 0 16px 12px 16px;
        margin: 0 -16px 16px -16px;
        border-bottom: 1px solid #d9d9d9;
    }

    .popover-checkbox-group {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        .checkbox-item {
            flex: none;
            width: 49%;
            margin: 0;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            line-height: 22px;
            margin-bottom: 10px;
        }
        // .checkbox-item:nth-last-child(2),
        // .checkbox-item:last-child {
        //     margin-bottom: 0;
        // }
    }

    .popover-checkbox-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        padding: 12px 16px 0 0;
        margin: 0 -16px;
        border-top: 1px solid #d9d9d9;

        .clear {
            flex: auto;

            & button {
                border: none;
            }
            & button:hover {
                border: none;
            }

            .clear-text {
                font-size: 14px;
                color: #999999;
                line-height: 22px;
                font-family: PingFangSC-Regular;
            }
        }

        button + button {
            margin-left: 8px;
        }
    }
}
</style>
