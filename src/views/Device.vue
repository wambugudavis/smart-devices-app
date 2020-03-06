<template>
    <div v-if="!update" class=" py-4 flex flex-col min-h-screen items-center justify-center">
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
                <button class="bg-white mx-3 inline-block hover:bg-davis text-davis hover:text-white border border-davis hover:border-transparent font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                    Delete
                </button>
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
                        <select class="form-select mt-1 block w-full">
                            <option v-for="item in manufacturers" :key="item.id">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">
                        Change description
                    </label>
                    <textarea class="form-textarea mt-1 block w-full" rows="3">
                        {{device.description}}
                    </textarea>
                </div>
                <div class="flex items-center justify-end">
                    <button class="bg-davis mx-3 inline-block hover:bg-white text-white hover:text-davis border border-transparent hover:border-davis font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
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
</template>

<script>
    import {mapState} from 'vuex'
    import moment from 'moment'

    export default {
        data: () => {
            return {
                update: false
            }
        },
        computed: {
            ...mapState(['manufacturers', 'devices']),
            device() {
                const deviceId = this.$route.params.id
                return this.devices.find((device) => {
                    return device.id.toString() === deviceId
                })
            }
        },
        methods: {
            toggleUpdateForm() {
                this.update = !this.update
            }
        },
        filters: {
            formatDate(date) {
                return moment(date).format('MMMM Do YYYY h:mm a');
            }
        }
    }
</script>
