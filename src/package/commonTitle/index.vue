<template>
    <div class="common-title">{{ title }}</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class CommonTitle extends Vue {
    @Prop({ default: '' }) title!: string;
}
</script>

<style lang="scss" scoped>
.common-title {
    position: relative;
    padding-left: 12px;
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 16px;
    color: #1d1d1d;
    &::after {
        position: absolute;
        left: 0;
        width: 4px;
        height: 16px;
        top: 50%;
        border-radius: 1px;
        transform: translateY(-50%);
        content: '';
        background: #4676ef;
    }
}
</style>
