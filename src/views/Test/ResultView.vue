<template>
  <div class="flex flex-col justify-start items-center pt-12">
    <div class="px-10 flex justify-between items-center w-full">
      <h1 class="font-medium text-3xl">Novice (Рівень {{ route.params.id }}) Результати</h1>
      <AppButton text="Рестар блоку" variant="danger" class="w-fit" @on-click="restartBlock()" />
    </div>
    <div
      class="pt-12 px-10 w-full flex flex-col justify-start items-center gap-y-4"
      v-if="resultData?.answers?.length"
    >
      <ResultsBlock
        v-for="(answ, idx) in resultData?.answers"
        :key="`${idx}_${answ.question_id}`"
        :result="answ"
        :idx="idx"
      />
    </div>
    <div class="flex w-full justify-between items-center px-10 mb-8 pt-10">
      <div>
        <AppButton
          v-if="resultData?.prev_level_id !== undefined && resultData?.prev_level_id !== null"
          @on-click="goToLevel(resultData.prev_level_id)"
          text="Назад"
          class="w-fit"
        />
      </div>
      <AppButton text="Зберегти" class="w-fit" @on-click="submitBlock(resultData?.level_id)" />
      <div>
        <AppButton
          v-if="resultData?.next_level_id !== undefined && resultData?.next_level_id !== null"
          @on-click="goToLevel(resultData.next_level_id)"
          text="Вперед"
          class="w-fit"
        />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <FinalResultPopup
      v-if="isFinalPopupShown"
      @on-close="onCloseFinalPopup"
      :title="finalPopupData?.level_name"
      :description="finalPopupData?.level_description"
    />
  </Teleport>
</template>
<script setup>
import AppButton from '@/components/atoms/AppButton.vue'
import ResultsBlock from '@/components/tests/ResultsBlock.vue'
import { useTestsStore } from '@/stores/tests'
import { useToast } from 'vue-toastification'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FinalResultPopup from '@/components/tests/popups/FinalResultsPopup.vue'

const route = useRoute()
const router = useRouter()

const testsStore = useTestsStore()

const toast = useToast()

const resultData = ref(null)
const finalPopupData = ref(null)
const isFinalPopupShown = ref(false)

onBeforeMount(() => {
  testsStore
    .getResults(route.params.id)
    .then((res) => {
      resultData.value = { ...res }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        toast.error('Сеанс завершено, будь ласка авторизуйтесь')
        router.push('/login')
      }
    })
})

function goToLevel(level_id) {
  router.push(`/test/${level_id}`)
}

function submitBlock(levelId) {
  if (resultData.value.next_level_id) {
    testsStore.submitResults(levelId)
  } else {
    testsStore.getFinalResult().then((res) => {
      finalPopupData.value = { ...res }
      isFinalPopupShown.value = true
    })
  }
}

function onCloseFinalPopup() {
  isFinalPopupShown.value = false
}

function restartBlock() {
  router.back()
}
</script>
