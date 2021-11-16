import { VueConstructor } from 'vue';
import SelectInput from './selectInput.vue';

(SelectInput as any).install = (Vue: VueConstructor) => {
    Vue.component(SelectInput.name || 'SelectInput', SelectInput);
};

export default SelectInput;
