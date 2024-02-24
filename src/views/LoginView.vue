<template>
  <AppCard>
    <div class="w-full flex justify-center mb-8">
      <h1 class="text-3xl font-semibold">Вхід</h1>
    </div>
    <form class="flex flex-col justify-start items-center gap-y-6" @submit.prevent="onSubmit">
      <AppInput v-model="email" type="text" placeholder="Пошта*" />
      <AppInput v-model="password" type="password" placeholder="Пароль*" class="mb-4" />
      <AppButton text="Далі" type="submit" class="w-full" />
    </form>
    <div class="flex justify-center items-center w-full">
      <span class="pt-4 text-wrap text-center"
        >Вперше на нашому сайті?&nbsp;<router-link
          class="text-purple-700 font-medium cursor-pointer hover:text-purple-800"
          to="/register"
          >Зареєструйтесь</router-link
        >
      </span>
    </div>
  </AppCard>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppInput from '@/components/atoms/AppInput.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import AppCard from '@/components/general/AppCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

function onSubmit() {
  if (email.value.length && password.value.length) {
    authStore
      .login({
        username: email.value,
        password: password.value
      })
      .then(() => {
        router.push('/')
      })
  }
}
</script>
