/**
 * Created by lhd on 2021-10-29 18:51:21
 */
import { VueConstructor } from 'vue';
import FixedFooter from './fixedFooter.vue';

(FixedFooter as any).install = (Vue: VueConstructor) => {
    Vue.component(FixedFooter.name || 'FixedFooter', FixedFooter);
};

export default FixedFooter;
