<template>
  <div class="flex flex-col justify-start items-center pt-12">
    <div class="px-10 flex justify-between items-center w-full">
      <h1 class="font-medium text-3xl">
        {{ pollData?.level_name }} (Рівень {{ route.params.id }})
      </h1>
      <AppButton @on-click="clearAnswers" text="Очистити" variant="danger" class="w-fit" />
    </div>
    <div class="pt-12">
      <div class="flex flex-col justify-start items-center gap-y-4">
        <QuestionBlock
          v-for="(quest, idx) in pollData?.questions"
          :key="'qst_' + idx"
          :question="quest"
          v-model="answers[idx]"
        />
      </div>
    </div>
    <div class="flex w-full justify-center items-center px-10 mb-8 pt-10">
      <AppButton text="Зберегти" class="w-fit" @on-click="goToResults" />
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTestsStore } from '@/stores/tests'
import { useToast } from 'vue-toastification'
import QuestionBlock from '@/components/tests/QuestionBlock.vue'
import AppButton from '@/components/atoms/AppButton.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const testsStore = useTestsStore()

const answers = ref([])

const pollData = ref(null)

onBeforeMount(() => {
  testsStore
    .getPoll(route.params.id)
    .then((res) => {
      pollData.value = { ...res }
      answers.value = new Array(res.questions.length ? res.questions.length : 4)
    })
    .catch((err) => {
      if (err.response.status === 401) {
        toast.error('Сеанс завершено, будь ласка авторизуйтесь')
        router.push('/login')
      }
    })
})

function goToResults() {
  if (
    answers.value.length === pollData.value.questions?.length &&
    !answers.value.includes(null) &&
    !answers.value.includes(undefined)
  ) {
    testsStore.setAnswers(answers.value).then(() => {
      router.push(`/result/${route.params.id}`)
    })
  } else {
    toast.warning('Будь ласка, дайте відповіді на всі питання блоку')
  }
}

function clearAnswers() {
  answers.value = new Array(pollData.value.questions.length ? pollData.value.questions.length : 4)
}

onBeforeMount(() => {})
</script>
