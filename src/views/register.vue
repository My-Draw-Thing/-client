<template>
  <div class="register">
    <form action>
      <!-- USERNAME -->
      <div class="inputUserName">
        <label for="inputUserName">userName</label>
        <input type="text" class="inputName" placeholder="input player name" v-model="userName" />
        <small
          id="title-small"
          class="form-text text-muted"
        >your name should be more than 2 characters</small>
        <button></button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // DB FIREBASE BELOM DIMASUKAN KARENA NANTINYA AKAN DISESUAIKAN
  // TERLEBIH DAHULU DENGAN MODEL REKAN2 YG LAIN UNTUK DISATUKAN
  data() {
    return {
      userName: "",
      status: "",
      token: "",
      name: this.userName,
      token: "",
      loginStatus: false
    };
  },
  methods: {
    register() {
      // nanti dirubah aja nama collectionnya disesuaikan dengan yg di firebase

      let alpha = "abcdefghijklmnopqrstuvwxyz";
      let randomToken = "";
      for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * alpha.length);
        randomToken += alpha[random];
      }

      this.token = randomToken;

      let obj = {
        name: this.userName,
        token: this.token
      };
      localStorage.setItem("token", obj.token);
      localStorage.setItem("name", obj.name);
    }
  }
};
</script>

<style>
</style>