<template>
  <button
    class="py-2 px-4 text-lg font-medium rounded-md"
    :class="{
      'bg-purple-700 text-white hover:bg-purple-800': variant === 'default' || !variant,
      'text-white bg-red-500 hover:bg-red-600': variant === 'danger'
    }"
    @click="onClick"
    :disabled="!!disabled"
  >
    {{ text ? text : 'AppButton' }}
  </button>
</template>
<script setup>
defineProps(['type', 'text', 'disabled', 'variant'])
const emit = defineEmits(['onClick'])

function onClick() {
  emit('onClick')
}
</script>
