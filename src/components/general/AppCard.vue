<template>
  <div
    class="shadow-sm border rounded-md py-8 px-8 md:px-10"
    :class="{
      'w-[320px] md:w-[420px]': !isLarge,
      'w-[320px] md:w-[620px]': isLarge
    }"
  >
    <slot />
  </div>
</template>
<script setup>
defineProps(['isLarge'])
</script>
