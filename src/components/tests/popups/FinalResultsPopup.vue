<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-black/30 z-10"></div>
  <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-20">
    <AppCard class="bg-white" :isLarge="true">
      <div class="flex flex-col w-full justify-center items-center">
        <div class="pb-2">
          <v-icon name="md-checkcircleoutline-round" class="text-purple-800 w-12 h-12" />
        </div>
        <h1 class="text-xl font-medium mb-1">
          Вітаємо! Ваш рівень - <span class="font-semibold">{{ title }}</span>
        </h1>
        <span class="text-base text-wrap text-center mb-6">{{ description }}</span>
        <AppButton text="Підтвердити" type="button" @on-click="goToDashboard" />
      </div>
    </AppCard>
  </div>
</template>
<script setup>
import AppCard from '@/components/general/AppCard.vue'
import AppButton from '@/components/atoms/AppButton.vue'

import { useRouter } from 'vue-router'

defineProps(['title', 'description'])

const emit = defineEmits(['onClose'])

const router = useRouter()

function goToDashboard() {
  emit('onClose')
  router.push('/')
}
</script>
