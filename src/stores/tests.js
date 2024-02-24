import axios from 'axios'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
const BASE_API = import.meta.env.VITE_BASE_API

export const useTestsStore = defineStore('tests', () => {
  async function getPoll(id) {
    const res = await axios.get(`${BASE_API}/polls/questions?level_id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('quizz_token')
      }
    })
    return res.data
  }

  async function setAnswers(answers) {
    try {
      const res = await axios.post(
        `${BASE_API}/answers`,
        {
          answers
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('quizz_token')
          }
        }
      )
      toast.success(res.data.message)
    } catch (e) {
      const message = e.response?.data?.message
      toast.error(message ? message : e.message)
      throw e
    }
  }

  async function getResults(id) {
    try {
      const res = await axios.get(`${BASE_API}/answers?level_id=${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('quizz_token')
        }
      })
      return res.data
    } catch (e) {
      const message = e.response?.data?.message
      toast.error(message ? message : e.message)
      throw e
    }
  }

  async function submitResults(levelId) {
    try {
      const res = await axios.post(
        `${BASE_API}/answers/submit`,
        {
          level_id: levelId
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('quizz_token')
          }
        }
      )
      toast.success(res.data.message)
      return res.data
    } catch (e) {
      const message = e.response?.data?.message
      toast.error(message ? message : e.message)
      throw e
    }
  }

  async function getFinalResult() {
    try {
      const res = await axios.get(`${BASE_API}/dashboard`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('quizz_token')
        }
      })
      return res.data
    } catch (e) {
      const message = e.response?.data?.message
      toast.error(message ? message : e.message)
      throw e
    }
  }

  return {
    getPoll,
    setAnswers,
    getResults,
    submitResults,
    getFinalResult
  }
})
