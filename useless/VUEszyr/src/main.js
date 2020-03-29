import Vue from 'vue'
import App from './App.vue'
import jsonp from './util/jsonp'
// import ElementUI from 'element-ui';
import {Dialog, Message, Loading} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.prototype.jsonp = jsonp;
// Vue.use(ElementUI);
Vue.use(Dialog);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;

new Vue({
    render: h => h(App),
}).$mount('#app');
