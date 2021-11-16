import { VueConstructor } from 'vue';
import CommonTitle from './index.vue';

(CommonTitle as any).install = (Vue: VueConstructor) => {
    Vue.component(CommonTitle.name || 'CommonTitle', CommonTitle);
};

export default CommonTitle;
