import { VueConstructor } from 'vue';
import IconButton from './IconButton.vue';

(IconButton as any).install = (Vue: VueConstructor) => {
    Vue.component(IconButton.name || 'IconButton', IconButton);
};

export default IconButton;
