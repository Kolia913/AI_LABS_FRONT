<template>
  <QuestionCard>
    <h1 class="mb-4 text-lg text-wrap">{{ question.question_content }}</h1>
    <div class="flex flex-col justify-start items-start gap-y-3">
      <AppRadio
        v-for="(answ, idx) in question.answers"
        :key="'answ' + idx"
        :value="answ.answer_id"
        :name="name"
        :label="answ.content"
        v-model="model"
      />
    </div>
  </QuestionCard>
</template>
<script setup>
import AppRadio from '@/components/atoms/AppRadio.vue'
import QuestionCard from './QuestionCard.vue'
defineProps(['question', 'name'])
const model = defineModel()
</script>
