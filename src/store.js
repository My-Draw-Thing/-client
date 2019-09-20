import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: []
  },
  mutations: {
    addQuestions(state, payload) {
        state.questions = payload
    }
  },
  actions: {
    
  }
})
