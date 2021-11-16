/**
 * Created by lhd on 2021-08-04 15:31:36
 */
import { VueConstructor } from 'vue';
import CommonTable from './commonTable.vue';

(CommonTable as any).install = (Vue: VueConstructor) => {
    Vue.component(CommonTable.name || 'CommonTable', CommonTable);
};

export { default as CommonTableConst } from './commonTable.const';
export * from './commonTable.dto';
export default CommonTable;
