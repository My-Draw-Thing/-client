<template>
  <div class="w-full h-screen flex flex-col">
    <div class="w-full h-full flex">
      <div class="w-1/5 flex justify-center items-center">Time</div>
      <div class="w-3/5 flex justify-center items-center">Question</div>
      <div class="w-1/5 flex justify-center items-center">Players</div>
    </div>
    <div class="w-full flex flex-wrap mt-auto">
      <AnswerCard :color="'red'"></AnswerCard>
      <AnswerCard :color="'blue'"></AnswerCard>
      <AnswerCard :color="'yellow'"></AnswerCard>
      <AnswerCard :color="'green'"></AnswerCard>
    </div>
  </div>
</template>

<script>
import AnswerCard from '../components/AnswerCard'

export default {
  name: 'game',
  components: {
    AnswerCard
  }
}
</script>

<style></style>
