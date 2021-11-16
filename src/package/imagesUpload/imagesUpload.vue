<template>
    <div class="images-upload">
        <!-- 负责添加 -->
        <a-upload
            list-type="picture-card"
            v-show="showUpload"
            accept=".jpg,.png,.jpeg"
            :beforeUpload="onBeforeUpload"
            :customRequest="onCustomUploadRequest"
            @change="onUploadChange"
            :showUploadList="false"
            :file-list="fileList"
            :multiple="true"
            style="width: 128px;"
        >
            <div class="images-upload_select-wrap">
                <img src="./images/plus.svg" alt="" />
            </div>
        </a-upload>
        <!-- 负责展示 -->
        <a-upload list-type="picture-card" :file-list="fileList" @change="onViewChange" @preview="previewFile" />
        <!-- 预览弹窗 -->
        <a-modal :visible="showModal" :footer="null" @cancel="showModal = false" width="800px">
            <img :src="curImageUrl" :alt="curImageUrl.name" style="width: 100%;" />
        </a-modal>
    </div>
</template>
<script lang="ts">
import { Http } from '../../commons/http';
import Config from '../../config';
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
/**
 * 使用示例
 * ```
 * <images-upload :fileList="fileList" @change="onChangeFile" :maxCount="10" :fileSize="10"/>
 * ```
 * 1. fileList: 已经上传的文件列表
 * 2. `@change` Function(files):void 返回数据
 * 3. maxCount: 最大数量，默认 5 张
 * 4. fileSize: 文件大小，默认 10 MB
 * 5. file 格式
 * ```
 * {
 *  uid: ID
 *  name: '文件名',
 *  type: 类型，
 *  size: 大小，
 *  status: 'done'
 *  url: 地址，用于回显
 *  response:{} 上传完成，接口返回的数据
 * }
 * ```
 */
@Component
export default class ImagesUpload extends Vue {
    // 默认 5 张
    @Prop({ default: 5 }) maxCount!: number;
    // 默认 10MB
    @Prop({ default: 10 }) fileSize!: number;

    @Model('change', {
        type: Array,
    })
    fileList!: any[];

    private showModal = false;
    private curImageFile: any = null;
    // 是否显示上传 Btn
    get showUpload() {
        return this.fileList.length < this.maxCount;
    }
    get curImageUrl() {
        if (!this.curImageFile) return '';
        const { response, url } = this.curImageFile;
        if (response) {
            const { domain, originalDrawing } = response;
            return `${domain}${originalDrawing.key}`;
        } else {
            return url;
        }
    }
    private previewFile(file: any) {
        this.curImageFile = file;
        this.showModal = true;
    }
    private onBeforeUpload(file: any) {
        const { size, type } = file;
        // 文件格式
        const isValidFormat = this.validFileFormat(type);
        if (!isValidFormat) {
            Config.vue?.$message.warning('请上传图片格式文件');
            return isValidFormat;
        }
        // 文件大小
        const isValidSize = this.validFileSize(size);
        if (!isValidSize) {
            Config.vue?.$message.warning(`文件大小不超过${this.fileSize}MB`);
            return isValidSize;
        }
        return isValidFormat && isValidSize;
    }
    private async onCustomUploadRequest(option: any) {
        Config.vue?.$message.loading({ content: '上传文件中...', duration: 0, key: 'uploading' });
        const res = await this.uploadFiles([option.file]);
        const { code, msg, data } = res;
        if (code === 200) {
            option.onSuccess(data);
            Config.vue?.$message.success({ content: '上传成功', key: 'uploading' });
        } else {
            Config.vue?.$message.warning({ content: msg || '上传失败', key: 'uploading' });
        }
    }

    // 上传 upload change 事件
    private onUploadChange(info: any) {
        const { fileList } = info;
        const files = fileList
            .filter((file: any) => {
                return this.validFileSize(file.size) && this.validFileFormat(file.type);
            })
            .map((file: any) => {
                const { response } = file;
                if (response) {
                    const { domain, thumbnail } = response;
                    file.thumbUrl = '';
                    file.url = `${domain}${thumbnail.key}`;
                }
                return file;
            });
        this.$emit('change', files);
    }
    // 展示 upload change 事件
    private onViewChange(info: any) {
        const { fileList } = info;
        this.$emit('change', fileList);
    }
    // 有效 大小
    private validFileSize(size: number) {
        return size / 1024 / 1024 < this.fileSize;
    }
    // 有效突破格式
    private validFileFormat(type: string) {
        return ['image/png', 'image/jpeg', 'image/jpg'].includes(type);
    }
    // 上传文件
    private uploadFiles(files: any[]) {
        const url = '/emer-file/file/uploadImageRead';
        return Http.uploadFiles(url, files);
    }
}
</script>

<style lang="scss" scoped>
.images-upload {
    display: flex;
    align-items: flex-start;
    ::v-deep {
        .ant-upload-picture-card-wrapper {
            .ant-upload-list-picture-card-container,
            .ant-upload-list-item,
            .ant-upload-select-picture-card {
                width: 120px;
                height: 120px;
            }
            .ant-upload-select-picture-card {
                border: 1px dashed #d9d9d9;
            }
            .ant-upload-list-item {
                margin-right: 8px;
                margin-bottom: 0;
                .ant-upload-list-item-uploading-text {
                    text-align: center;
                }
                .ant-upload-list-item-progress {
                    display: none;
                }
            }
        }
    }
    .images-upload_select-wrap {
        width: 104px;
        height: 104px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
