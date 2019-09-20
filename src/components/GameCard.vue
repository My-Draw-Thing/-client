<template>
  <div>
    <div class="w-64 h-32 bg-gray-400 rounded flex m-2">
      <div class="w-4/6 flex flex-col justify-center pl-3">
        <div>
          <span class="font-bold">Room Name</span> : <br />
          {{ game.id }}
        </div>
        <div>
          <span class="font-bold"> Room Master </span> :
          <br />
          {{ game.roomMaster.name }}
        </div>
      </div>
      <div class="w-2/6 flex justify-center items-center">
        <button @click="joinRoom" class="px-4 py-2 text-white rounded btn-green">Join</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/apis/firebase'
const {quizilla, questions} = db

import firebase from 'firebase'

export default {
  name: 'game-card',
  props: ['game', 'user'],
  methods: {
    joinRoom() {
      quizilla.doc(this.game.id).update({
        users: firebase.firestore.FieldValue.arrayUnion(this.user)
      })
      this.$store.commit('getUser', this.user)
      this.$router.push('play')
      
      localStorage.setItem('roomID', this.game.id)
    }
  }
}
</script>

<style scoped>
.btn-green {
  background-color: #61bd4f;
}
</style>
