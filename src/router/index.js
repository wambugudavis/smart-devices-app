import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Device from '../views/Device.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/device/:id',
        name: 'Device',
        component: Device
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
