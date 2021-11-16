<!--Created by lhd on 2021-08-04 15:31:36-->
<template>
    <div class="commonTable">
        <a-table
            v-if="components"
            table-layout="fixed"
            :bordered="true"
            :row-key="rowKey"
            :loading="loading"
            :custom-row="customRow"
            :pagination="pagination"
            :expand-icon="expandIcon"
            :components="components"
            :data-source="dataSource"
            :columns="currentColumns"
            :row-selection="rowSelection"
            :scroll="{ x: true, y: true }"
            :custom-header-row="customHeaderRow"
            :default-expand-all-rows="defaultExpandAllRows"
            :expandIcon-column-index="expandIconColumnIndex"
            :children-column-name="childrenColumnName"
            :class="{ 'c-table': true, 'nested-table': childrenColumnName }"
        >
            <template v-for="slotName in getSlotList(columns)" :slot="slotName" slot-scope="text, record, index">
                <slot :name="slotName" :text="text" :record="record" :index="index" />
            </template>
        </a-table>
        <!-- 包治百病的偏方 -->
        <div v-if="!loading && !childrenColumnName && form.size > 11" class="table-scroll-overlap-occlusion" />
    </div>
</template>
<script lang="ts" src="./commonTable.ts" />
<style scoped lang="scss" src="./commonTable.scss" />
