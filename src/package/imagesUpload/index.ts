import { VueConstructor } from 'vue';
import ImagesUpload from './imagesUpload.vue';

(ImagesUpload as any).install = (Vue: VueConstructor) => {
    Vue.component(ImagesUpload.name || 'ImagesUpload', ImagesUpload);
};

export default ImagesUpload;
