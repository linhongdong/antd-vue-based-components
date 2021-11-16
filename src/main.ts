import Vue from 'vue';
import App from './examples/App.vue';
import Index from './index';

Vue.config.productionTip = false;

Vue.use(Index);

const instance: Vue = new Vue({
    render: h => h(App),
});

instance.$mount('#app');

export default instance;
