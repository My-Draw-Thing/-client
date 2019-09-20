import Vue from 'vue'
import Router from 'vue-router'
import Play from './views/Play.vue'
// import Game from './views/Game.vue'
import Game from './views/Game2.vue'
import Login from './views/Login.vue'
import Lobby from './views/Lobby.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
})
