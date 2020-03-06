import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

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
        },

        async addDevice({dispatch}, payload) {
            const response = await this.$axios.post('/smart-devices', payload)

            if (response.status === 200) {
                dispatch('fetchDevices')
            }
        },

        async updateDevice({dispatch}, payload) {
            const id = payload.id
            delete payload.id
            const response = await this.$axios.put(`/smart-devices/${id}`, payload)

            if (response.status === 204) {
                dispatch('fetchDevices')
            }
        },

        async deleteDevice({dispatch}, id) {
            const response = await this.$axios.delete(`/smart-devices/${id}`)

            if (response.status === 204) {
                dispatch('fetchDevices').then(() => {
                    router.push('/')
                })
            }
        },

        async fetchDevice({commit}, id) {
            const response = await this.$axios.get(`/smart-devices/${id}`)

            if (response.status === 200) {
                commit('saveDevices', [response.data])
            }
        }
    },

    modules: {}
})
