<template>
  <div class="w-full h-screen flex flex-col">
    <div class="bg-color"></div>
    <div class="w-full h-full flex z-10">
      <div class="w-1/5 flex justify-center items-center">Time</div>
      <div class="w-3/5 flex justify-center items-center">Question</div>
      <div class="w-1/5 flex justify-center items-center">{{ userState }}</div>
    </div>
    <div class="w-full flex flex-wrap mt-auto z-10">
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
  },
  computed: {
    userState() {
      return this.$store.state.user
    }
  }
}
</script>

<style>
.bg-color {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #dfdce3;
}
</style>
