<template>
  <AppCard>
    <div class="w-full flex justify-center mb-8">
      <h1 class="text-3xl font-semibold text-wrap text-center w-[140px] md:w-fit">Реєстрація</h1>
    </div>
    <form class="flex flex-col justify-start items-center gap-y-6" @submit.prevent="onSubmit">
      <AppInput v-model="fullName" type="text" placeholder="Повне ім'я*" />
      <AppInput v-model="email" type="text" placeholder="Пошта*" />
      <AppInput v-model="password" type="password" placeholder="Пароль*" class="mb-4" />
      <AppButton text="Далі" type="submit" class="w-full" />
    </form>
    <div class="flex justify-center items-center w-full">
      <span class="pt-4 text-wrap text-center"
        >Уже є акаунт?&nbsp;<router-link
          class="text-purple-700 font-medium cursor-pointer hover:text-purple-800"
          to="/login"
          >Увійти</router-link
        >
      </span>
    </div>
  </AppCard>
</template>
<script setup>
import { ref } from 'vue'
import AppInput from '@/components/atoms/AppInput.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import AppCard from '@/components/general/AppCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const password = ref('')

function onSubmit() {
  if (email.value.length && password.value.length && fullName.value.length) {
    authStore
      .register({
        username: email.value,
        fullname: fullName.value,
        password: password.value
      })
      .then(() => {
        router.push('/login')
      })
  }
}
</script>
