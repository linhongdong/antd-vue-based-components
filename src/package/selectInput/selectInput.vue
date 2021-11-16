<template>
    <div class="select-input">
        <span class="value">{{ value }}</span>
        <div class="icon" />
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SelectInput extends Vue {
    @Prop({ default: '' }) value!: string;
}
</script>

<style lang="scss" scoped>
.select-input {
    min-height: 30px;
    border: 1px solid #d9d9d9;
    padding: 4px 11px;
    display: flex;
    align-items: center;
    .value {
        flex: 1;
    }
    .icon {
        width: 16px;
        height: 16px;
        background: url('./images/search.svg') no-repeat;
    }
}
</style>
