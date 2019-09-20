<template>
  <div v-if="createRoomStatus" class="modal-mask flex justify-center items-center">
    <button class="close-modal" @click="closeModal"></button>
    <div class="modal-container w-64 bg-white py-5 px-2 mb-20 rounded z-10">
      <div class="flex flex-col">
        <label for="roomName">Room Name:</label>
        <input
          v-model="roomName"
          type="text"
          class="border-gray-400 border-2 rounded px-2 py-1 mb-4 mt-2 focus:outline-none focus:border-gray-700"
        />
        <button
          @click="submitCreate"
          class="px-4 py-2 h-10 text-white rounded bg-orange-500 focus:outline-none"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/apis/firebase'
const {quizilla, questions} = firebase

export default {
  name: 'createRoom',
  props: ['createRoomStatus', 'user'],
  data() {
    return {
      token: '',
      name: '',
      roomName: ''
    }
  },
  methods: {
    submitCreate() {
      quizilla
        .doc(this.roomName)
        .set({
          roomMaster: { name: this.name, token: this.token },
          corrects: [],
          users: [],
          questions: '',
          isPlay: false
        })
        .then(_ => {
          console.log('Room is created!')
          this.$emit('createRoom', false)
        })
        .catch(console.log)
      this.$emit('createRoom', false)
    },
    closeModal() {
      console.log('masuk')
      this.$emit('createRoom', false)
    }
  },
  created() {
    this.token = this.user.token
    this.name = this.user.name
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.close-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
