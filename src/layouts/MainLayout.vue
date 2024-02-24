<template>
  <main>
    <app-menu />
    <div class="ml-[210px]">
      <router-view />
    </div>
  </main>
</template>
<script setup>
import AppMenu from '@/components/general/AppMenu.vue'
</script>
