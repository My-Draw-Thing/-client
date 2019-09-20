import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lobby from './views/Lobby.vue'
import Game from './views/Game.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
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
