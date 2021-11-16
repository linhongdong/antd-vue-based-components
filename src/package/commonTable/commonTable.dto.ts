/**
 * CommonTable 组件的配置信息
 * 整体配置和 ant-design-vue 保持一致
 *
 * ***使用示例***（前提是组件已经全局挂载了）
 * 参考：src\views\policyDocument\components\policyList\policyList.vue
    <CommonTable
        :total="total"
        :rowKey="rowKey"
        :loading="loading"
        :columns="columns"
        :resizable="false"
        :submit="submitSearch"
        :dataSource="tableData"
        :rowSelection="rowSelection"
        :childrenColumnName="'children'"
        :defaultExpandAllRows="defaultExpandAllRows"
    >
        <template v-slot:fileName="{ text, record }">
            <span>{{ text }}{{ record.other }}</span>
        </template>
        <template v-slot:fileSize="{ text }">
            <span>{{ (text / 1024).toFixed(2) }}KB</span>
        </template>
        <template v-slot:operation="{ record }">
            <IconButton type="download" @click="download(record)" />
            <IconButton type="delete" @click="deleteBtn(record)" />
        </template>
    </CommonTable>
 *********************************************************************
 * ***参数配置***
 * :total="total" // 列表数据总条数，用于分页器
 * :columns="columns" // 列数据配置，参考 ant-design-vue 官方文档
 * :resizable="false" // 默认 true，列数据配置，为 true 时，width 需要为数字类型
 * :isPagination="true" // 默认 true，是否显示分页器
 * :submit="submitSearch" // 分页器改变时会调用该方法提交，返回的 values 里边包含 {current: 1, size: 10}
 * :dataSource="tableData" // 数据源
 * :tableLoading="loading" // loading 状态
 * :rowSelection="rowSelection" // 用于显示选框，参考 ant-design-vue 官方文档
 * :rowKey="rowKey" // 默认取 id 如果 id 不存在请配置 rowKey，参考 ant-design-vue 官方文档
 * :childrenColumnName="'children'" // 指定树形结构的列名
 * :defaultExpandAllRows="defaultExpandAllRows" // 初始时，是否展开所有行
 *********************************************************************
 * ***注意事项***
 * width 宽度要大于等于 61，且不能小于 title 文字的宽度，最好是 200 以上不容易出现错位情况，不然就会错位 ！！！
 * resizable 为 true 时，column 的 width 属性需要为数字类型，否则不生效
 * 必须设置 column 的 width 属性（尽量不要使用 % ，有滚动条时 title 可能会错位），否则列头和内容可能不对齐
 * 如果指定 width 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。
 * 只有 column 中配置了 width 属性的列，列宽可调节才能生效
 * 操作列的 key 请定义成 operation，会特殊处理，否则有些功能不生效
 * 操作列的按钮统一使用 IconButton 组件
 * 支持列宽使用 table-draggable-handle 插件，需要单独安装才能生效
 *********************************************************************
 * ***类型声明入下***
 */
export type TableTotal = number;
export type TableSubmit = Function;
export type TableLoading = boolean;
