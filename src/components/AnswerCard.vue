<template>
  <div class="btn flex items-center justify-center py-1">
    <button
      @click="submitAnsware(answare)"
      class="inner-btn h-40 my-1 flex justify-center items-center focus:outline-none"
      :class="color"
    >
      <p class="text-white font-bold text-2xl antialiased">{{ answare }}</p>
    </button>
  </div>
</template>

<script>
export default {
  props: ['color', 'answare'],
  methods: {
    submitAnsware(answare) {
      if (answare === this.game.questions.correct) {
        let getLocalToken = JSON.parse(localStorage.getItem('token'))

        quizilla.doc(this.roomID).update({
          corrects: firebase.firestore.FieldValue.arrayUnion(getLocalToken)
        })
      }
    }
  }
}
</script>

<style scoped>
.red {
  background-color: #e4443c;
}

.blue {
  background-color: #44a3e3;
}

.yellow {
  background-color: #f9be32;
}

.green {
  background-color: #66bf39;
}

.btn {
  width: 50%;
}

.inner-btn {
  width: 98%;
}
</style>
