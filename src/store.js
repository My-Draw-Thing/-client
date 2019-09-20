import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    user: {},
    roomId: ''
  },
  mutations: {
    addQuestions(state, payload) {
      state.questions = payloa
    },
    getUser(state, payload) {
      state.user = payload
    },
    addRoomId(state, payload) {
      state.roomId = payload
    }
  },
  actions: {
    
  }
})
