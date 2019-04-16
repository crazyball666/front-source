import '../scss/app.scss';
import Vue from 'vue';
import router from './router/index';
import App from './component/App.vue';

Vue.use(router);
new Vue({
    router,
    template: '<App/>',
    components: { App }
}).$mount('#app')