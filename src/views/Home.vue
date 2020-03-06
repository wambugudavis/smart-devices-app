<template>
    <div class="flex flex-row min-h-screen">
        <div class="w-1/2 section flex flex-col">
            <h1 class="text-gray-600 font-semibold text-3xl py-4">Add New Device</h1>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                        Choose manufacturer
                    </label>
                    <div class="relative">
                        <select class="form-select mt-1 block w-full">
                            <option v-for="item in manufacturers" :key="item.id">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">
                        Add a description
                    </label>
                    <textarea class="form-textarea mt-1 block w-full" rows="3"
                              placeholder="Enter description."></textarea>
                </div>
                <div class="flex items-center justify-end">
                    <button class="bg-davis hover:bg-white text-white hover:text-davis border border-transparent hover:border-davis font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                        Add Device
                    </button>
                </div>
            </form>
        </div>
        <div class="w-1/2 section bg-white shadow-lg">
            <h1 class="text-davis font-semibold text-3xl py-4">Devices</h1>
            <device-list :devices="devices"/>
        </div>
    </div>
</template>

<script>
    import DeviceList from '../components/DeviceList'

    export default {
        name: 'Home',
        components: {
            DeviceList
        },
        data: () => {
            return {
                devices: [
                    {
                        "id": 1,
                        "updated_at": "2020-03-06 10:37:30",
                        "description": "Updated Sample description",
                        "manufacturer": {
                            "id": 1,
                            "name": "Muthaiga Industrials"
                        }
                    },
                    {
                        "id": 3,
                        "updated_at": "2020-03-06 10:36:21",
                        "description": "This is 3rd sample description",
                        "manufacturer": {
                            "id": 2,
                            "name": "Other"
                        }
                    }
                ],
                manufacturers: [
                    {
                        "id": 1,
                        "created_at": "2020-03-06 10:24:56",
                        "updated_at": "2020-03-06 10:24:56",
                        "name": "Muthaiga Industrials"
                    },
                    {
                        "id": 2,
                        "created_at": "2020-03-06 10:24:56",
                        "updated_at": "2020-03-06 10:24:56",
                        "name": "Other"
                    }
                ]
            }
        }
    }
</script>
