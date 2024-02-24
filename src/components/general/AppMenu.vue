<template>
  <nav
    class="fixed top-0 bottom-0 lef-0 w-[210px] border-r shadow-sm px-4 py-10 flex flex-col justify-between"
  >
    <div>
      <div class="flex justify-start items-center mb-6 gap-x-2">
        <v-icon name="md-school" class="text-purple-700 w-10 h-10" />
        <h1 class="text-lg font-medium">ШІ Лаби</h1>
      </div>
      <ul class="w-full flex flex-col justify-start items-center gap-4">
        <li
          v-for="item in menuList"
          :key="item.link"
          class="w-full flex justify-start gap-1 items-center"
        >
          <v-icon
            :name="item.icon"
            class="text-gray-400"
            :class="{
              'text-purple-800': route.fullPath === item.link
            }"
          />
          <router-link
            :to="item.link"
            :class="{
              'text-purple-700': route.fullPath === item.link
            }"
            >{{ item.title }}</router-link
          >
        </li>
      </ul>
    </div>
    <div class="w-full flex flex-col justify-center items-center gap-y-4 cursor-pointer">
      <div class="flex justify-center items-center gap-x-2" @click="logout">
        <v-icon name="md-logout-outlined" class="rotate-180" />
        <span class="text-purple-700 hover:text-purple-800">Вийти</span>
      </div>
      <p class="text-sm">
        Автор &COPY; <span class="font-medium text-purple-700">Балій Микола</span>
      </p>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const menuList = ref([
  {
    title: 'Статистика',
    link: '/',
    icon: 'md-dashboard'
  },
  {
    title: 'Тести',
    link: '/test/1',
    icon: 'md-notealt-sharp'
  }
])

function logout() {
  authStore.logout().then(() => {
    router.push('/login')
  })
}
</script>
