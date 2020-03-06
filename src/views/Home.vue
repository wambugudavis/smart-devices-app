<template>
    <div class="flex flex-row min-h-screen max-h-screen overflow-y-hidden">
        <div class="w-1/2 section flex flex-col">
            <h1 class="text-gray-600 font-semibold text-3xl py-4">Add New Device</h1>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                        Choose manufacturer
                    </label>
                    <div class="relative">
                        <select class="form-select mt-1 block w-full" v-model="form.manufacturer_id"
                                @blur="validateField('manufacturer_id')">
                            <option v-for="item in manufacturers" :key="item.id" :value="item.id">{{item.name}}</option>
                        </select>
                        <span v-if="formErrors.manufacturer_id !== null" class="text-xs text-davis italic">{{formErrors.manufacturer_id}}</span>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">
                        Add a description
                    </label>
                    <textarea class="form-textarea mt-1 block w-full" rows="3"
                              placeholder="Enter description." v-model="form.description"
                              @blur="validateField('description')"></textarea>
                    <span v-if="formErrors.description !== null" class="text-xs text-davis italic">{{formErrors.description}}</span>
                </div>
                <div class="flex items-center justify-end">
                    <button class="bg-davis hover:bg-white text-white hover:text-davis border border-transparent hover:border-davis font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            @click="submitForm"
                    >
                        Add Device
                    </button>
                </div>
            </form>
        </div>
        <div class="w-1/2 section bg-white shadow-lg pb-10 overflow-y-scroll">
            <h1 class="text-davis font-semibold text-3xl py-4">Devices</h1>
            <device-list :devices="devices"/>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import DeviceList from '../components/DeviceList'

    export default {
        name: 'Home',
        components: {
            DeviceList
        },
        data: () => {
            return {
                form: {
                    manufacturer_id: null,
                    description: null
                },
                formErrors: {
                    manufacturer_id: null,
                    description: null
                }
            }
        },
        computed: {
            ...mapState(['devices', 'manufacturers']),

            formValid() {
                return Object.keys(this.form).every((field) => {
                    return this.form[field] !== null || '';
                });
            }
        },
        methods: {
            ...mapActions({
                fetchManufactures: 'fetchManufactures',
                fetchDevices: 'fetchDevices',
                addDevice: 'addDevice'
            }),

            validateField(field) {
                if (this.form[field] === null || '') {
                    return this.formErrors[field] = 'This field is required'
                }
                this.formErrors[field] = null
            },

            submitForm() {
                if (this.formValid) {
                    this.addDevice(this.form)
                } else {
                    return Object.keys(this.form).forEach((field) => {
                        return this.validateField(field)
                    });
                }
            }
        },
        created() {
            this.fetchManufactures()
            this.fetchDevices()
        }
    }
</script>
