<template>
  <div>
    <div class="flex flex-col items-center justify-center h-screen">
      Play the game
      <br />
      <br />
      <strong>List Players</strong>
      <ul>
        <li v-for="game in game.users" :key="game.token">{{ game.name }}</li>
      </ul>

      <button @click="play" v-if="isRoomMaster" class="px-2 py-1 bg-orange-500 rounded">Start</button>
    </div>
  </div>
</template>

<script>
import db from '@/apis/firebase'
const { quizilla, questions } = db

export default {
  name: 'play',
  data() {
    return {
      // Dari state / localstorage
      roomID: localStorage.getItem('roomID') || 'defaultAcakKaloBelumMasukRoom',
      token: {},
      isRoomMaster: false,

      // Info room
      game: {}
    }
  },
  methods: {
    getDataGame() {
      this.token = JSON.parse(localStorage.getItem('token'))

      quizilla.doc(this.roomID).onSnapshot(snapshot => {
        if (snapshot.data()) {
          let roomData = snapshot.data()
          this.game = roomData
          // console.log(roomData);
          this.isRoomMaster = this.token.token === this.game.roomMaster.token ? true : false

          // Cek apakah merupakan member / siRoomMaster
          let found = false
          for (let i = 0; i < this.game.users.length; i++) {
            if (this.game.users[i].token == this.token.token) {
              found = true
              break
            }
          }

          if (found || this.isRoomMaster) {
            // Ok bisa maen
            if (this.game.isPlay) {
              this.$router.push('game')
            }
          } else {
            this.$router.push('lobby')
            console.log('Kamu tidak memiliki hak maen di room ini')
          }
        } else {
          // Redirect ke menu utama
          this.$router.push('lobby')
          console.log('Room tidak ada')
        }
      })
    },
    play() {
      questions
        .get()
        .then(data => {
          let tmpQuestion = []
          data.forEach(el => {
            let tmp = {
              id: el.id,
              ...el.data()
            }

            tmpQuestion.push(tmp)
          })
          console.log(this.roomID)
          quizilla.doc(this.roomID).update({
            isPlay: true,
            questions: {
              answare: tmpQuestion[0].answare,
              correct: tmpQuestion[0].correct,
              image: tmpQuestion[0].image,
              question: tmpQuestion[0].question
            }
          })

          this.$store.commit('addQuestions', tmpQuestion)

          // console.log(this.$store.state.questions[0].correct);
        })
        .catch(err => {})
    }
  },
  created() {
    this.getDataGame()

    // this.roomID = this.$store.state.roomId;
  }
}
</script>

<style></style>
