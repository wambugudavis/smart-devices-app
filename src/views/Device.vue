<template>
    <div v-if="devices !== null">
        <div v-if="!update" class="py-4 flex flex-col min-h-screen items-center justify-center">
            <div>
                <h1 class="text-gray-600 font-semibold text-3xl py-4">Device Details</h1>
            </div>
            <div class="bg-white w-full md:w-1/2 section shadow-lg rounded-lg flex flex-col">
                <div class="px-6 py-4">
                    <div class="flex flex-row items-center py-3">
                        <div class="w-1/3 flex">
                            <div class="label mr-6">Serial</div>
                        </div>
                        <div class="font-bold text-xl my-2 w-2/3 text-davis">{{device.id}}</div>
                    </div>
                    <div class="flex flex-row items-center py-3">
                        <div class="w-1/3 flex">
                            <div class="label mr-6">Manufacturer</div>
                        </div>
                        <div class="font-bold text-xl my-2 w-2/3">{{device.manufacturer.name}}</div>
                    </div>
                    <div class="flex flex-row items-start py-3">
                        <div class="w-1/3 flex">
                            <div class="label mr-6">Description</div>
                        </div>
                        <div class="w-2/3 text-gray-700 text-base py-2 font-light">
                            {{device.description}}
                        </div>
                    </div>
                    <div class="flex flex-row items-start py-3">
                        <div class="w-1/3 flex">
                            <div class="label mr-6">Last Updated</div>
                        </div>
                        <div class="w-2/3 text-davis text-base py-2">
                            {{device.updated_at | formatDate}}
                        </div>
                    </div>
                </div>
                <div class="px-6 py-4 -mx-3">
                    <button class="bg-davis mx-3 inline-block hover:bg-white text-white hover:text-davis border border-transparent hover:border-davis font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            @click="toggleUpdateForm"
                    >
                        Update
                    </button>
                    <button v-if="!confirmDelete"
                            class="bg-white mx-3 inline-block hover:bg-davis text-davis hover:text-white border border-davis hover:border-transparent font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            @click="confirmDeleteAction">
                        Delete
                    </button>
                    <button v-else
                            class="bg-white mx-3 inline-block hover:bg-davis text-davis hover:text-white border border-davis hover:border-transparent font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            @click="deleteDeviceAction"
                    >
                        Confirm Delete?
                    </button>
                </div>
                <div class="px-6">
                    <span v-if="confirmDelete"
                          class="text-xs text-davis italic">Deleting a device cannot be undone.</span>
                </div>
            </div>
        </div>
        <div v-else class="py-4 flex flex-col min-h-screen items-center justify-center">
            <div>
                <h1 class="text-gray-600 font-semibold text-3xl py-4">Update Device</h1>
            </div>
            <div class="bg-white w-full md:w-1/2 section shadow-lg rounded-lg flex flex-col">
                <form class="px-6 py-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                            Change manufacturer
                        </label>
                        <div class="relative">
                            <select class="form-select mt-1 block w-full" v-model="form.manufacturer_id"
                                    @blur="validateField('manufacturer_id')">
                                <option v-for="item in manufacturers" :key="item.id" :value="item.id">{{item.name}}
                                </option>
                            </select>
                            <span v-if="formErrors.manufacturer_id !== null" class="text-xs text-davis italic">{{formErrors.manufacturer_id}}</span>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-semibold mb-2">
                            Change description
                        </label>
                        <textarea class="form-textarea mt-1 block w-full" rows="3"
                                  placeholder="Change description." v-model="form.description"
                                  @blur="validateField('description')"></textarea>
                        <span v-if="formErrors.description !== null" class="text-xs text-davis italic">{{formErrors.description}}</span>
                    </div>
                    <div class="flex items-center justify-end">
                        <button class="bg-davis mx-3 inline-block hover:bg-white text-white hover:text-davis border border-transparent hover:border-davis font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                @click="submitForm"
                        >
                            Save
                        </button>
                        <button
                                class="bg-white mx-3 inline-block hover:bg-davis text-davis hover:text-white border border-davis hover:border-transparent font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                @click="toggleUpdateForm">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-else class="flex flex-col min-h-screen items-center justify-center">
        <p class="text-gray-700">Fetching device details with id <span class="font-semibold">{{$route.params.id}}</span>
        </p>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import moment from 'moment'

    export default {
        data: () => {
            return {
                update: false,
                confirmDelete: false,
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
            ...mapState(['manufacturers', 'devices']),
            device() {
                const deviceId = this.$route.params.id
                return this.devices.find((device) => {
                    return device.id.toString() === deviceId
                })
            },

            formValid() {
                return Object.keys(this.form).every((field) => {
                    return this.form[field] !== null || '';
                });
            }
        },
        methods: {
            ...mapActions({
                updateDevice: 'updateDevice',
                deleteDevice: 'deleteDevice',
                fetchDevice: 'fetchDevice'
            }),

            toggleUpdateForm() {
                this.update = !this.update
            },

            toggleConfirmDelete() {
                this.confirmDelete = !this.confirmDelete
            },

            confirmDeleteAction() {
                this.toggleConfirmDelete()
            },

            deleteDeviceAction() {
                this.deleteDevice(this.device.id)
            },

            validateField(field) {
                if (this.form[field] === null || '') {
                    return this.formErrors[field] = 'This field is required'
                }
                this.formErrors[field] = null
            },

            submitForm() {
                if (this.formValid) {
                    this.updateDevice({
                        ...this.form,
                        id: this.device.id
                    }).then(() => {
                        this.toggleUpdateForm()
                    })
                } else {
                    return Object.keys(this.form).forEach((field) => {
                        return this.validateField(field)
                    });
                }
            }
        },
        filters: {
            formatDate(date) {
                return moment(date).format('MMMM Do YYYY h:mm a');
            }
        },
        created() {
            if (this.devices === null) {
                this.$router.push('/')
            }

            this.form.description = this.device.description
            this.form.manufacturer_id = this.device.manufacturer.id
        }
    }
</script>
