/**
 * Created by lhd on 2021-08-04 10:55:54
 */
import { VueConstructor } from 'vue';
import SearchForm from './searchForm.vue';

(SearchForm as any).install = (Vue: VueConstructor) => {
    Vue.component(SearchForm.name || 'SearchForm', SearchForm);
};

export { default as SearchFormConst } from './searchForm.const';
export * from './searchForm.dto';
export default SearchForm;
