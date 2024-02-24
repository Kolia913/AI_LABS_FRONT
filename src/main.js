import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueIcon from '@/includes/vue-icons'
import Toast from '@/includes/toast'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 3rd party plugins
app.use(Toast)
app.use(VueIcon)

app.mount('#app')
