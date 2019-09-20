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

      db.collection("")
        .add({
          name: this.dataContainer.userName,
          status: this.dataContainer.status,
          createdAt: this.dataContainer.createdAt
        })
        .then(data => {
          console.log("berhasil masuk kesini");

          let alpha = "abcdefghijklmnopqrstuvwxyz";
          let randomToken = "";
          this.token = randomToken;
          for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * alpha.length);
            randomToken += alpha[random];
          }
          let obj = {
            name: this.name,
            token: this.token
          };
          localStorage.setItem(obj);
        })
        .catch(err => {
          console.log(err, "<<< INI ERRNYA");
        });
    }
  }
};
</script>

<style>
</style>