<template>
  <label class="flex items-center">
    <input
      type="radio"
      :value="value"
      :name="name"
      v-model="selected"
      class="flex justify-center items-center cursor-pointer w-5 h-5 rounded-full bg-gray-50 border border-solid border-purple-700 hecked:after:content-[''] checked:after:w-3 checked:after:h-3 checked:after:rounded-full checked:after:bg-purple-700"
    />
    <span class="ml-2 text-sm text-gray-700">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps(['value', 'label', 'name'])
const selected = defineModel()
</script>
