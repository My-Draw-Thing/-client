<template>
  <div id="app">
    <div class="bg-wallpaper">
      <img src="../src/assets/imgs/paula-vermeulen-_f2m3mEkaaU-unsplash.jpg" alt="" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Amatic+SC:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Mansalva&display=swap');

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Lato', sans-serif;
}

.amatic {
  /* font-family: 'Mansalva', cursive; */
  font-family: 'Amatic SC', cursive;
}

.bg-wallpaper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}
</style>
