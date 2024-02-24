<template>
  <div class="shadow-sm border rounded-md w-full py-8 px-8 md:px-10">
    <div class="flex w-full justify-start items-center gap-x-3">
      <div class="border-r h-6 pr-2 w-24">
        <span class="text-sm text-nowrap">Питання №{{ idx }}:</span>
      </div>
      <div class="w-full flex justify-start items-center gap-x-2">
        <div class="relative content-[''] h-4 bg-gray-200 w-full">
          <div
            :style="`width: calc(100% - ${100 - (result.user_points * 100) / result.max_points}%)!important`"
            class="absolute content-[''] left-0 bottom-0 h-4 bg-purple-700"
          ></div>
        </div>
        <span class="w-8">{{ result.user_points }}/{{ result.max_points }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps(['result', 'idx'])
</script>
