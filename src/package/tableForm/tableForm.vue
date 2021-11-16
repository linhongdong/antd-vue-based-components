<!--Created by lhd on 2021-08-24 14:20:59-->
<template>
    <div class="tableForm">
        <a-table
            class="table-form-table"
            bordered
            :row-key="rowKey"
            :columns="columns"
            :pagination="false"
            :customRow="customRow"
            :dataSource="dataSource"
        >
            <template
                v-for="{
                    key,
                    min,
                    max,
                    type,
                    rules,
                    config,
                    options,
                    onChange,
                    maxLength,
                    precision,
                    hideToday,
                    precisions,
                    scopedSlots,
                    placeholder,
                    disabledDate,
                } in columns"
                :slot="scopedSlots && scopedSlots.customRender"
                slot-scope="text, record, index"
            >
                <a-form-model-item
                    class="table-form-item"
                    :key="key"
                    :colon="false"
                    :ref="`ref_[${index}]_[${key}]`"
                    :prop="`${tableName}[${index}][${key}]`"
                    :rules="rules"
                >
                    <div class="operation-buttons" v-if="type === 'operation' && record.editable">
                        <IconButton type="delete" @click="deleteProduct(index)" />
                    </div>
                    <a-input
                        class="item-input"
                        v-else-if="type === 'input' && record.editable && !editable"
                        allow-clear
                        v-model.trim="dataSource[index][key]"
                        :maxLength="maxLength"
                        :placeholder="placeholder || defaultPlaceholder[0]"
                    />
                    <a-input-number
                        class="item-input"
                        v-else-if="type === 'number' && record.editable && !editable"
                        v-model.trim="dataSource[index][key]"
                        :min="min"
                        :max="max"
                        :precision="
                            precisions ? (precisions[index] ? precisions[index] : 0) : precision ? precision : 0
                        "
                        :placeholder="placeholder || defaultPlaceholder[1]"
                        :parser="value => value && value.replace(/\$\s?|(,*)/g, '')"
                        :formatter="value => value && value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    />
                    <a-select
                        class="item-select"
                        v-else-if="type === 'select' && record.editable && !editable"
                        v-model.trim="dataSource[index][key]"
                        allow-clear
                        show-search
                        option-filter-prop="title"
                        :placeholder="placeholder || defaultPlaceholder[0]"
                        @change="
                            (value, option) => {
                                dataSource[index][`${getFieldsName(config, 'label') || `__label__${key}`}`] = option
                                    ? option.componentOptions.propsData.title
                                    : undefined;
                                onChange && onChange(value, option, index, key, dataSource);
                            }
                        "
                    >
                        <a-select-option
                            v-for="option in options"
                            :key="option[getFieldsName(config, 'dictKey')]"
                            :value="option[getFieldsName(config, 'dictKey')]"
                            :title="option[getFieldsName(config, 'dictLabel')]"
                        >
                            <span> {{ option[getFieldsName(config, 'dictLabel')] }} </span>
                        </a-select-option>
                    </a-select>
                    <a-tree-select
                        v-else-if="type === 'tree-select' && record.editable && !editable"
                        class="item-select"
                        v-model.trim="dataSource[index][key]"
                        allow-clear
                        show-search
                        tree-default-expand-all
                        tree-node-filter-prop="title"
                        :treeData="options"
                        :replace-fields="getReplaceFields(config)"
                        :placeholder="placeholder || defaultPlaceholder[0]"
                        :search-placeholder="placeholder || defaultPlaceholder[1]"
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                        @change="
                            (value, option) => {
                                dataSource[index][`${getFieldsName(config, 'label') || `__label__${key}`}`] = option[0];
                                onChange && onChange(value, option, index, key, dataSource);
                            }
                        "
                    />
                    <a-date-picker
                        class="item-date"
                        v-if="type === 'date' && record.editable && !editable"
                        v-model.trim="dataSource[index][key]"
                        :show-today="!hideToday"
                        :disabled-date="disabledDate || (() => false)"
                        :placeholder="placeholder || defaultPlaceholder[1]"
                        @change="(date, dateString) => (dataSource[index][key] = dateString)"
                    />
                    <div v-else-if="!record.editable && type === 'operation'" class="editable-height" :key="key" />
                    <div
                        v-else-if="(type === 'tree-select' || type === 'select') && !record.editable"
                        :key="key"
                        class="editable-height"
                    >
                        {{ dataSource[index][getFieldsName(config, 'label') || `__label__${key}`] || '-' }}
                    </div>
                    <div
                        v-else-if="!record.editable || type === 'text' || editable"
                        class="editable-height"
                        :key="key"
                        :title="dataSource[index][key]"
                    >
                        {{
                            type === 'number'
                                ? formatNumberDelimiter(dataSource[index][key]) || '-'
                                : dataSource[index][key] || '-'
                        }}
                    </div>
                    <slot
                        v-if="'slot' === type && scopedSlots && record.editable && !editable"
                        :text="text"
                        :index="index"
                        :record="record"
                        :dataSource="dataSource"
                        :name="scopedSlots.customRender"
                    />
                </a-form-model-item>
            </template>
        </a-table>

        <!-- <a-button class="add-button" type="dashed" icon="plus" @click.stop="addPorduct">
            <span>添加</span>
        </a-button> -->
    </div>
</template>
<script lang="ts" src="./tableForm.ts" />
<style scoped lang="scss" src="./tableForm.scss" />
