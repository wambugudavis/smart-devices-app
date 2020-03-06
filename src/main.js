import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
});
Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
