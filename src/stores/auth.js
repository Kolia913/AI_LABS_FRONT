import axios from 'axios'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
const BASE_API = import.meta.env.VITE_BASE_API

export const useAuthStore = defineStore('auth', () => {
  async function login({ username, password }) {
    try {
      const res = await axios.post(`${BASE_API}/auth/login`, {
        username,
        password
      })
      localStorage.setItem('quizz_token', res.data.access_token)
      toast.success(res.data.message)
      return res.data
    } catch (e) {
      const message = e.response?.data?.message
      toast.error(message ? message : e.message)
      throw e
    }
  }

  async function register({ username, fullname, password }) {
    try {
      const res = await axios.post(`${BASE_API}/auth/signup`, {
        username,
        fullname,
        password
      })
      toast.success(res.data.message)
      return res.data
    } catch (e) {
      const message = e.response?.data.message
      toast.error(message ? message : e.message)
      throw e
    }
  }

  async function logout() {
    localStorage.removeItem('quizz_token')
    toast.info('До наступних зустрічей:)')
  }

  return {
    login,
    register,
    logout
  }
})
