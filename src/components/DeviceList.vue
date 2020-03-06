<template>
    <div>
        <div
                v-for="(device, index) in devices"
                :key="index"
                class="flex flex-row px-4 py-4 rounded-lg hover:shadow-md hover:bg-white"
        >
            <div class="w-3/5 flex flex-row items-start">
                <router-link :to="`/device/${device.id}`">
                    <div class="badge bg-davis-light text-davis cursor-pointer">{{device.id}}</div>
                </router-link>
                <div>
                    <p class="text-gray-800 font-semibold">{{device.manufacturer.name}}</p>
                    <p class="text-gray-500 text-sm font-light">{{device.description}}</p>
                </div>
            </div>
            <div class="w-2/5 items-start">
                <div class="float-right text-sm flex flex-col">
                    <span>{{device.updated_at | formatDate}}</span>
                    <span class="text-davis text-xs">at {{device.updated_at | formatTime}}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        props: {
            devices: Array
        },
        filters: {
            formatDate(date) {
                return moment(date).format('MMMM Do YYYY');
            },

            formatTime(date) {
                return moment(date).format('h:mm a');
            }
        }
    }
</script>
