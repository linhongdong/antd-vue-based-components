/* eslint-disable vue/valid-v-for */
<!--Created by lhd on 2021-08-04 10:55:54-->
<template>
    <div class="searchForm" :style="{ paddingBottom: modalInline ? 0 : '12px' }">
        <div :class="modalInline ? 'search-form-content-modal-inline' : '  search-form-content'">
            <a-form-model
                class="cover-ant-form"
                ref="searchForm"
                :colon="false"
                :model="formInline"
                @submit="handleSubmit"
                @submit.native.prevent
            >
                <a-form-model-item
                    class="cover-form-item"
                    v-for="(item, index) in form"
                    :key="item.key"
                    :prop="item.key"
                    :label="item.label"
                >
                    <a-select
                        class="cover-form-item"
                        allowClear
                        v-if="'select' === item.type"
                        v-model="formInline[item.key]"
                        :placeholder="item.placeholder || defaultPlaceholder[0]"
                        @change="(value, option) => item.onChange && item.onChange(value, formInline, option)"
                    >
                        <a-select-option
                            v-for="option in  (item.options || [])"
                            :key="option[getAttributesName(item.config, 'dictKey')]"
                            :value="option[getAttributesName(item.config, 'dictKey')]"
                        >
                            <span> {{ getLabel(option, item.config) }} </span>
                        </a-select-option>
                    </a-select>

                    <!-- <a-select
                        class="cover-form-item"
                        allowClear
                        v-if="'select-opt-group' === item.type"
                        v-model="formInline[item.key]"
                        :placeholder="item.placeholder || defaultPlaceholder[0]"
                        @change="(value, option) => item.onChange && item.onChange(value, formInline, option)"
                    >
                        <a-select-opt-group
                            v-for="option in (item.options || [])"
                            :key="option[getAttributesName(item.config, 'dictKey')]"
                            :value="option[getAttributesName(item.config, 'dictKey')]"
                        >
                            <span slot="label"> {{ getLabel(option, item.config) }} </span>
                            <a-select-option
                                v-for="opt in (option[getAttributesName(item.config, 'children')] || [])"
                                :key="opt[getAttributesName(item.config, 'dictKey')]"
                                :value="opt[getAttributesName(item.config, 'dictKey')]"
                            >
                                <span> {{ getLabel(opt, item.config) }} </span>
                            </a-select-option>
                        </a-select-opt-group>
                    </a-select> -->
                    <a-select
                        allowClear
                        v-if="'select-opt-group' === item.type"
                        v-model="formInline[item.key]"
                        :placeholder="item.placeholder || defaultPlaceholder[0]"
                        @change="(value, option) => item.onChange && item.onChange(value, formInline, option)"
                    >
                        <a-select-opt-group
                            v-for="option in (item.options || [])"
                            :key="option[getAttributesName(item.config, 'dictKey')]"
                            :value="option[getAttributesName(item.config, 'dictKey')]"
                        >
                            <span slot="label"> {{ getLabel(option, item.config) }} </span>
                            <a-select-option
                                v-for="opt in (option[getAttributesName(item.config, 'children')] || [])"
                                :key="opt[getAttributesName(item.config, 'dictKey')]"
                                :value="opt[getAttributesName(item.config, 'dictKey')]"
                            >
                                <span> {{ getLabel(opt, item.config) }} </span>
                            </a-select-option>
                        </a-select-opt-group>
                    </a-select>
                    <a-cascader
                        class="cover-form-item"
                        v-if="'cascader' === item.type"
                        change-on-select
                        :placeholder="item.placeholder || defaultPlaceholder[0]"
                        :field-names="item.fieldNames"
                        :options="item.options"
                        v-model="formInline[item.key]"
                    />
                    <a-date-picker
                        class="cover-form-item"
                        v-if="'dateTime' === item.type"
                        v-model="formInline[item.key]"
                        :show-today="!item.hideToday"
                        :disabled-date="item.disabledDate || (() => false)"
                        :placeholder="item.placeholder || defaultPlaceholder[1]"
                        @change="(date, dateString) => (formInline[item.key] = dateString)"
                    />
                    <a-input
                        class="cover-form-item"
                        v-if="'input' === item.type"
                        v-model.trim="formInline[item.key]"
                        :maxLength="item.max || 25"
                        :placeholder="item.placeholder || defaultPlaceholder[1]"
                        allowClear
                    />
                    <a-range-picker
                        class="cover-form-item"
                        :placeholder="item.placeholder || [defaultPlaceholder[0], defaultPlaceholder[0]]"
                        v-if="'range' === item.type"
                        v-model="formInline[item.key]"
                        :disabled-date="item.disabledDate || (() => false)"
                        @change="(date, dateString) => (formInline[item.key] = dateString)"
                    />
                    <slot
                        v-if="'slot' === item.type && item.scopedSlots"
                        :item="item"
                        :index="index"
                        :form="formInline"
                        :name="item.scopedSlots.customRender"
                    />
                </a-form-model-item>
                <a-form-model-item class="cover-form-item cover-form-item-buttons">
                    <a-button class="search-form-button" v-if="isReset" :loading="loading" @click="resetForm">
                        <span class="iconfont button-icon reset-icon">&#xe024;</span>
                        <span>重置</span>
                    </a-button>
                    <a-button class="search-form-button" type="primary" html-type="submit" :loading="loading">
                        <span class="iconfont button-icon">&#xe022;</span>
                        <span>查询</span>
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
    </div>
</template>
<script lang="ts" src="./searchForm.ts" />
<style scoped lang="scss" src="./searchForm.scss" />
