<template>
    <a-config-provider :locale="locales['zhCN']">
        <div id="app">
            <div class="title-box">
                <img class="vue-logo" alt="Vue logo" src="@/assets/logo.png" />
                <CommonTitle title="组件示例" />
            </div>
            <div class="line" />
            <SearchForm :form="formModels" :submit="submitSearch" :loading="loading">
                <template v-slot:selectInput="{ form }">
                    <SelectInput class="item-input" :value="form.fileName" />
                </template>
            </SearchForm>
            <div class="table-box">
                <CommonTable
                    :total="total"
                    :columns="columns"
                    :submit="submitSearch"
                    :dataSource="dataSource"
                    :loading="loading"
                >
                    <template v-slot:index="{ index }">
                        <span>{{ index + 1 }}</span>
                    </template>
                    <template v-slot:fileName="{ text, record }">
                        <a-tooltip :title="text + record.fileExtension" style="cursor: pointer;">
                            <span>{{ text }}{{ record.fileExtension }}</span>
                        </a-tooltip>
                    </template>
                    <template v-slot:operation="{ record }">
                        <IconButton type="download" @click="download(record)" />
                        <IconButton type="delete" @click="deleteBtn(record)" />
                    </template>
                </CommonTable>
            </div>
            <div class="line" />
            <div class="table-box">
                <div class="add-button">
                    <a-button type="primary" @click="addRow">新增信息</a-button>
                </div>
                <a-form-model
                    class="cover-ant-form"
                    ref="basicRuleForm"
                    :rules="rules"
                    :model="tableForm"
                    :colon="false"
                >
                    <a-form-model-item class="cover-form-item" label="企业名称" prop="name">
                        <a-input placeholder="请输入" v-model="tableForm.name" />
                    </a-form-model-item>
                    <a-form-model-item class="cover-form-item cover-form-item-alone">
                        <TableForm
                            tableName="dataList"
                            ref="proudctTableForm"
                            :columns="tableFormColumns"
                            :dataSource="tableForm.dataList"
                        >
                            <template v-slot:productName="{ text, record, dataSource, index }">
                                <div :key="record.id" style="display: flex;">
                                    <a-input v-model="dataSource[index].productName" :title="text" />
                                </div>
                            </template>
                        </TableForm>
                    </a-form-model-item>
                </a-form-model>
            </div>
            <FixedFooter>
                <a-button @click="save">按钮</a-button>
            </FixedFooter>
            <div class="bottom-height" />
        </div>
    </a-config-provider>
</template>

<script lang="ts">
import { TableFormColumns } from '@/package/tableForm';
import TableForm from '@/package/tableForm/tableForm';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class App extends Vue {
    /**
     * antd 国际化语言存放
     */
    private locales = {
        zhCN: require('lhd-ant-design-vue/lib/locale-provider/zh_CN')['default'],
        enUS: require('lhd-ant-design-vue/lib/locale-provider/en_US')['default'],
    };

    private formModels = [
        {
            label: '文件名称',
            key: 'fileName',
            type: 'input',
        },
        {
            label: '搜索弹框',
            key: 'selectInput',
            type: 'slot',
            scopedSlots: { customRender: 'selectInput' },
        },
    ];
    private searchForm = {
        size: 10, // 每页的数量
        current: 1, // 当前页
    };
    private loading = false;
    private total = 200;
    private columns: any[] = [
        {
            title: '文件名称',
            dataIndex: 'fileName',
            key: 'fileName',
            scopedSlots: { customRender: 'fileName' },
            width: 500,
        },
        {
            title: '创建者',
            dataIndex: 'createUserName',
            key: 'createUserName',
            width: 500,
        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            // width: 200,
        },
        {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
            align: 'right',
            fixed: 'right',
            width: 128,
        },
    ];
    /**
     * tableForm 的父级表单
     * */
    private tableForm = {
        name: '',
        dataList: [],
    };
    /**
     * TableFormColumns配置项
     */
    private tableFormColumns: TableFormColumns[] = [
        {
            type: 'slot',
            title: '物资名称',
            dataIndex: 'productName',
            key: 'productName',
            maxLength: 30,
            // slots: { title: 'productNameTitle' },
            scopedSlots: { customRender: 'productName' },
            rules: { required: true, message: '请输入', trigger: 'blur' },
            customHeaderCell() {
                return {
                    class: {
                        // 此处用来给 title 添加必填红色 *
                        'table-form-label-required': true,
                    },
                };
            },
        },
        {
            type: 'text',
            title: '规格',
            key: 'invstd',
            dataIndex: 'invstd',
        },
        {
            type: 'number',
            title: '数量',
            key: 'quantity',
            dataIndex: 'quantity',
            rules: { required: true, message: '请输入', trigger: 'blur' },
            customHeaderCell() {
                return { class: { 'table-form-label-required': true } };
            },
        },
        {
            type: 'input',
            title: '单位',
            key: 'units',
            dataIndex: 'units',
            maxLength: 30,
        },
    ];
    rules = {
        name: [
            {
                required: true,
                message: '请输入企业名称',
                trigger: ['change', 'blur'],
            },
        ],
    };
    private dataSource = [
        {
            id: 51,
            fileType: 1,
            fileKey: '1455850014531428353',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-03 18:51:06',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-03 18:51:06',
            isDeleted: 0,
        },
        {
            id: 49,
            fileType: 1,
            fileKey: '1455485994628587522',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:44:37',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:44:37',
            isDeleted: 0,
        },
        {
            id: 47,
            fileType: 1,
            fileKey: '1455485971501195266',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:44:32',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:44:32',
            isDeleted: 0,
        },
        {
            id: 45,
            fileType: 1,
            fileKey: '1455485953394384897',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:44:28',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:44:28',
            isDeleted: 0,
        },
        {
            id: 43,
            fileType: 1,
            fileKey: '1455485927138041858',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:44:21',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:44:21',
            isDeleted: 0,
        },
        {
            id: 41,
            fileType: 1,
            fileKey: '1455481314531909634',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:26:02',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:26:02',
            isDeleted: 0,
        },
        {
            id: 39,
            fileType: 1,
            fileKey: '1455480182187270146',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:21:32',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:21:32',
            isDeleted: 0,
        },
        {
            id: 37,
            fileType: 1,
            fileKey: '1455479992894136321',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:20:46',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:20:46',
            isDeleted: 0,
        },
        {
            id: 35,
            fileType: 1,
            fileKey: '1455479807707226113',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 18:20:02',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 18:20:02',
            isDeleted: 0,
        },
        {
            id: 33,
            fileType: 1,
            fileKey: '1455466945450385409',
            fileName: '新建 pdf文档',
            fileExtension: '.pdf',
            fileSize: 22725,
            fileSign: 0,
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            tenantId: 1374184746905837569,
            createUser: '1374184746947780610',
            createUserName: 'admin6',
            createTime: '2021-11-02 17:28:56',
            updateUser: '1374184746947780610',
            updateUserName: 'admin6',
            updateTime: '2021-11-02 17:28:56',
            isDeleted: 0,
        },
    ];
    /**
     * SearchForm 提交查询
     */
    private submitSearch(values: any) {
        console.log('values----->>>', values);
        this.searchForm = { ...this.searchForm, ...values };
    }
    /**
     * 添加
     */
    private addRow() {
        (this.$refs?.proudctTableForm as TableForm)?.add();
        // (this.$refs?.proudctTableForm as TableForm)?.add({ id: getUuid() });
    }
    /**
     * 按钮
     */
    private save() {
        console.log('this.tableForm----->>>', this.tableForm);
        (this.$refs.basicRuleForm as any).validate((valid: boolean) => {
            console.log('this.$refs.basicRuleForm  valid ----->>>', valid);
            // if (valid) {
            // } else {
            //     return false;
            // }
        });
    }
    private mounted() {
        console.log('this----->>>', this);
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.title-box {
    padding: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    .vue-logo {
        margin-right: 16px;
        width: 20px;
    }
}

.line {
    height: 1px;
    width: 100%;
    background: #d9d9d9;
}

.table-box {
    padding: 32px;

    .add-button {
        width: 100%;
        margin-bottom: 24px;
        text-align: left;
    }
}

.bottom-height {
    height: 64px;
    width: 100%;
}
</style>
