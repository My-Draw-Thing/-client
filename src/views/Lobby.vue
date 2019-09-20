<template>
  <div class="h-screen w-full">
    <CreateRoomModal
      @createRoom="createRoom"
      :createRoomStatus="createRoomStatus"
    ></CreateRoomModal>

    <div class="w-full h-32 flex flex-col justify-center items-center">
      Welcome To Quizilla!
      <button
        @click="createRoom(true)"
        class="px-4 py-2 h-10 text-white rounded bg-orange-500 focus:outline-none"
      >
        Create Room
      </button>
    </div>
    <div class="h-auto flex flex-col items-center justify-center">
      <div class="container bg-purple-700 flex flex-wrap overflow-y-auto rounded">
        <div v-for="game in games" :key="game.id">
          <GameCard :game="game" :user="user"></GameCard>
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
    <Game></Game>
  </div> -->
</template>

<script>
import GameCard from '../components/GameCard'
import CreateRoomModal from '../components/CreateRoomModal'
import Game from '../views/Game'
import quizilla from '@/apis/firebase'

export default {
  name: 'lobby',
  components: {
    GameCard,
    CreateRoomModal,
    Game
  },
  data() {
    return {
      createRoomStatus: false,
      games: [],
      user: { token: 'ini token user', name: 'something' }
    }
  },
  methods: {
    createRoom(payload) {
      this.createRoomStatus = payload
    },
    fetchRooms() {
      quizilla.onSnapshot(querySnapshot => {
        const newGames = []
        querySnapshot.docs.forEach(doc => {
          newGames.push({
            id: doc.id,
            ...doc.data()
          })
        })
        console.log(newGames)
        this.games = newGames
      })
    }
  },
  mounted() {
    this.fetchRooms()
  }
}
</script>

<style scoped>
.container {
  width: 816px;
  height: 434px;
}
</style>
