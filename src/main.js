import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tw-output.css'
// import 'p5'

Vue.config.productionTip = false

Vue.prototype.$playSound = (path, volume = 1) => {
  var audio = new Audio(path);
  audio.volume = volume
  audio.play();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
