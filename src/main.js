import Vue from "vue"
import Vuex from 'vuex';
import App from "./App"
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


// 引入路由配置
import router from './routers/index'

// 开启错误提示
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);


// 应用级状态
const VuexStore = new Vuex.Store({
    state: {
        isManager : false,
        indexArticles: [],
        categoryArticles: [],
        tags: [],
        scrollTop: 0,
        articlesLoading: false
    },
    mutations: {
    }
})

const app = new Vue({
    el: '#app',
    store: VuexStore,
    router: router, // 添加路由配置
    render: h=> h(App)
})
