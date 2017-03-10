import Vue from "vue"
import App from "./App"
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 引入路由配置
import router from './routers/index'

// 开启错误提示
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);

const app = new Vue({
    el: '#app',
    router: router, // 添加路由配置
    render: h=> h(App)
})
