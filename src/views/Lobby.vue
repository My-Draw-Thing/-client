<template>
  <div class="h-screen w-full">
    <CreateRoomModal
      @createRoom="createRoom"
      :createRoomStatus="createRoomStatus"
      :user="user"
    ></CreateRoomModal>
    <div class="w-full h-64 flex flex-col justify-center items-center font-hairline amatic">
      <div class="text-6xl">
        <i class="far fa-grin-tongue-squint"></i>
        <p class="inline-block pl-2 tracking-wider">Quizilla!</p>
        <!-- <AudioPlayer :sources="audioSources" :loop="true"></AudioPlayer> -->
      </div>
      <button
        @click="createRoom(true)"
        class="px-4 py-2 text-white rounded bg-orange-500 focus:outline-none mt-8 text-2xl"
      >
        Create Room
      </button>
    </div>
    <div class="h-auto flex flex-col items-center justify-center font-hairline">
      <div
        class="container bg-purple-600 border-4 border-black flex flex-wrap overflow-y-auto rounded"
      >
        <div v-for="game in games" :key="game.id">
          <GameCard :game="game" :user="user"></GameCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from '../components/GameCard'
import CreateRoomModal from '../components/CreateRoomModal'
import Game from '../views/Game'
import quizilla from '@/apis/firebase'
import { Howl, Howler } from 'howler'
import AudioPlayer from '../components/AudioPlayer'

export default {
  name: 'lobby',
  components: {
    GameCard,
    CreateRoomModal,
    Game,
    AudioPlayer
  },
  data() {
    return {
      createRoomStatus: false,
      games: [],
      user: { token: 'ini token user', name: 'something' },
      audioSources: ['@/assets/sounds/snap.wav']
    }
  },
  methods: {
    createRoom(payload) {
      // this.playSound(['../assets/sounds/snap.wav'])
      // this.$playSound('@/assets/sounds/snap.wav')
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
    // playSound(path) {
    //   const sound = new Howl({
    //     src: path,
    //     volume: 0.5,
    //     onend: function() {
    //       console.log('Finished!')
    //     }
    //   })
    //   sound.play()
    //   console.log(sound)
    // }
  },
  created() {
    const userData = localStorage.getItem('token')
    this.user = JSON.parse(localStorage.getItem('token'))
    console.log(this.user)
  },
  mounted() {
    this.fetchRooms()
  }
}
</script>

<style scoped>
.container {
  width: 825cpx;
  height: 434px;
}
</style>
