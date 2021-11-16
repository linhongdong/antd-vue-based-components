<template>
    <div class="icon-button">
        <a-tooltip placement="top" :title="title" :trigger="trigger">
            <!-- 重看，编辑 -->
            <div class="icon" v-if="notConfirm" @click="onClickItem">
                <img :src="icon(type)" alt="" class="img" />
            </div>
            <!-- 删除 -->
            <a-popconfirm
                title="确认删除本条内容吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onClickItem"
                v-if="isConfirm"
            >
                <div class="icon">
                    <img :src="icon(type)" alt="" class="img" />
                </div>
            </a-popconfirm>
            <!-- 禁用 -->
            <div class="icon" v-if="isTooltip" @click="onClickItem">
                <img :src="icon(disabled ? 'disable' : 'enable')" alt="" class="img" />
            </div>
        </a-tooltip>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import addIcon from './images/add.svg';
import deleteIcon from './images/delete.svg';
import editIcon from './images/edit.svg';
import setupIcon from './images/setup.svg';
import disableIcon from './images/disable.svg';
import enableIcon from './images/enable.svg';
import downloadIcon from './images/download.svg';
import auditIcon from './images/audit.svg';
import cancelIcon from './images/cancel.svg';
import saveIcon from './images/save.svg';
import uploadIcon from './images/upload.svg';
import gContinueIcon from './images/generateA.svg';
import gAuditIcon from './images/generateB.svg';
import doneIcon from './images/done.svg';
import addSubIcon from './images/addSub.svg';
import startIcon from './images/start.svg';
// 类型
enum IconButtonType {
    add = 'add', // 添加
    delete = 'delete', // 删除
    edit = 'edit', // 编辑
    setup = 'setup', // 设置
    disable = 'disable', // 禁用
    download = 'download', // 下载
    audit = 'audit', // 审核
    cancel = 'cancel',
    save = 'save',
    upload = 'upload',
    gContinue = 'gContinue',
    gAudit = 'gAudit',
    done = 'done',
    addSub = 'addSub',
    start = 'startIcon',
}
const icons: any = {
    add: addIcon,
    delete: deleteIcon,
    edit: editIcon, // 编辑
    setup: setupIcon, // 设置
    download: downloadIcon, // 下载
    audit: auditIcon,
    save: saveIcon,
    cancel: cancelIcon,
    upload: uploadIcon,
    gContinue: gContinueIcon,
    gAudit: gAuditIcon,
    done: doneIcon,
    addSub: addSubIcon,
    disable: disableIcon,
    enable: enableIcon,
    start: startIcon,
};
/**
 * @Prop
 * ```
 * type: 类型；
 * disabled: 是否禁用（在 type 为 disable 时使用)
 * ```
 * 使用示例：
 * ```
 * <icon-button type="setup" />
 * <icon-button type="delete" />
 * <icon-button type="edit" />
 * <!-- 启用 -->
 * <icon-button type="disable" />
 * <!-- 禁用 -->
 * <icon-button type="disable" :disabled="true" />
 * ```
 */
@Component
export default class IconButton extends Vue {
    // Icon 类型
    @Prop({ default: IconButtonType.edit }) type!: IconButtonType;
    @Prop({ default: false }) disabled!: boolean;
    @Prop({ default: 'hover' }) trigger!: string;
    @Prop({ default: '' }) tooltip!: string;
    private onClickItem() {
        this.$emit('click');
    }
    // 无额外提示的ICON
    get notConfirm() {
        return (
            this.type === IconButtonType.edit ||
            this.type === IconButtonType.setup ||
            this.type === IconButtonType.download ||
            this.type === IconButtonType.audit ||
            this.type === IconButtonType.cancel ||
            this.type === IconButtonType.save ||
            this.type === IconButtonType.add ||
            this.type === IconButtonType.upload ||
            this.type === IconButtonType.gContinue ||
            this.type === IconButtonType.gAudit ||
            this.type === IconButtonType.done ||
            this.type === IconButtonType.addSub ||
            this.type === IconButtonType.start
        );
    }
    // confirm
    get isConfirm() {
        return this.type === IconButtonType.delete;
    }
    // tooltip
    get isTooltip() {
        return this.type === IconButtonType.disable;
    }
    get title() {
        if (this.tooltip) return this.tooltip;
        const map: any = {
            delete: '删除',
            edit: '编辑', // 编辑
            setup: '设置', // 设置
            download: '下载', // 下载
            audit: '审核',
            save: '保存',
            cancel: '取消',
            add: '添加',
            upload: '上报',
            gContinue: '生成续报',
            gAudit: '生成核报',
            done: '完成',
            addSub: '添加子类',
            start: '执行',
        };
        if (this.type === 'disable') {
            return this.disabled ? '禁用' : '启用';
        } else {
            return map[this.type] || '';
        }
    }
    private icon(type: IconButtonType) {
        return icons[type];
    }
}
</script>

<style lang="scss" scoped>
.icon-button {
    cursor: pointer;
    align-items: center;
    box-sizing: content-box;
    height: 16px;
    display: inline-block;
    font-size: 0;

    .icon {
        width: 16px;
        height: 16px;
        display: inline-block;

        .img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
</style>
