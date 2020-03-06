<template>
    <div class="flex flex-col min-h-screen items-center justify-center">
        <div class="w-1/2">
            <h1></h1>
        </div>
        <div class="bg-white w-full md:w-1/2 section shadow-lg rounded-lg flex flex-col">
            <div class="px-6 py-4">
                <div class="flex flex-row items-center py-3">
                    <div class="w-1/3 flex">
                        <div class="label mr-6">Serial</div>
                    </div>
                    <div class="font-bold text-xl my-2 w-2/3 text-davis">1</div>
                </div>
                <div class="flex flex-row items-center py-3">
                    <div class="w-1/3 flex">
                        <div class="label mr-6">Manufacturer</div>
                    </div>
                    <div class="font-bold text-xl my-2 w-2/3">The Coldest Sunset</div>
                </div>
                <div class="flex flex-row items-start py-3">
                    <div class="w-1/3 flex">
                        <div class="label mr-6">Description</div>
                    </div>
                    <div class="w-2/3 text-gray-700 text-base py-2 font-light">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
                        et perferendis eaque, exercitationem praesentium nihil.
                    </div>
                </div>
                <div class="flex flex-row items-start py-3">
                    <div class="w-1/3 flex">
                        <div class="label mr-6">Last Updated</div>
                    </div>
                    <div class="w-2/3 text-davis text-base py-2">
                        2nd March 2020
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 -mx-3">
                <button class="bg-davis mx-3 inline-block hover:bg-white text-white hover:text-davis border border-transparent hover:border-davis font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                    Update
                </button>
                <button class="bg-white mx-3 inline-block hover:bg-davis text-davis hover:text-white border border-davis hover:border-transparent font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
