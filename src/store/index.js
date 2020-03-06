import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        devices: null,
        manufacturers: null
    },

    mutations: {
        toggleLoading(state, status) {
            state.loading = status
        },

        saveDevices(state, devices) {
            state.devices = devices
        },

        saveManufacturers(state, manufacturers) {
            state.manufacturers = manufacturers
        }
    },

    actions: {
        async fetchManufactures({commit}) {
            const response = await this.$axios.get('/manufacturers')
            commit('saveManufacturers', response.data)
        },

        async fetchDevices({commit}) {
            const response = await this.$axios.get('/smart-devices')
            commit('saveDevices', response.data)
        }
    },

    modules: {}
})
