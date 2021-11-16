/**
 * Created by lhd on 2021-08-24 14:20:59
 */
import { VueConstructor } from 'vue';
import TableForm from './tableForm.vue';

(TableForm as any).install = (Vue: VueConstructor) => {
    Vue.component(TableForm.name || 'TableForm', TableForm);
};

export { default as TableFormConst } from './tableForm.const';
export { default as TableFormClass } from './tableForm';
export * from './tableForm.dto';
export default TableForm;
