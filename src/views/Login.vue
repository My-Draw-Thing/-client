<template>
  <div class="register">
    <div class="flex flex-col justify-center items-center h-screen mb-16">
      <div>
        <form>
          <!-- USERNAME -->
          <div class="inputUserName">
            <div>
              <label class="font-bold" for="inputUserName">Your Name:</label>
              <br />
              <input
                type="text"
                class="inputName px-2 py-1 w-64 border-gray-400 border-2 rounded my-2 focus:outline-none"
                id="inputUserName"
                placeholder="input player name"
                v-model="userName"
              />
            </div>
            <div>
              <small id="title-small" class="form-text text-muted italic"
                >your name should be more than 2 characters</small
              >
            </div>
            <div class="w-full flex justify-center">
              <button
                @click.prevent="register"
                class="px-4 py-2 h-10 text-white rounded bg-orange-500 mt-2 focus:outline-none mx-auto"
              >
                Let's Play!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // DB FIREBASE BELOM DIMASUKAN KARENA NANTINYA AKAN DISESUAIKAN
  // TERLEBIH DAHULU DENGAN MODEL REKAN2 YG LAIN UNTUK DISATUKAN
  data() {
    return {
      userName: '',
      status: '',
      token: '',
      loginStatus: false
    }
  },
  methods: {
    register() {
      // nanti dirubah aja nama collectionnya disesuaikan dengan yg di firebase
      let alpha = 'abcdefghijklmnopqrstuvwxyz'
      let randomToken = ''
      for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * alpha.length)
        randomToken += alpha[random]
      }
      this.token = randomToken
      let obj = {
        name: this.userName,
        token: this.token
      }

      localStorage.setItem('token', JSON.stringify(obj))

      this.$router.push('lobby')

      // db.collection('')
      //   .add({
      //     name: this.dataContainer.userName,
      //     status: this.dataContainer.status,
      //     createdAt: this.dataContainer.createdAt
      //   })
      //   .then(data => {
      //     console.log('berhasil masuk kesini')

      //     let alpha = 'abcdefghijklmnopqrstuvwxyz'
      //     let randomToken = ''
      //     this.token = randomToken
      //     for (let i = 0; i < 5; i++) {
      //       let random = Math.floor(Math.random() * alpha.length)
      //       randomToken += alpha[random]
      //     }
      //     let obj = {
      //       name: this.name,
      //       token: this.token
      //     }
      //     localStorage.setItem(obj)
      //   })
      //   .catch(err => {
      //     console.log(err, '<<< INI ERRNYA')
      //   })
    }
  },
  mounted() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      this.$router.push('lobby')
    }
  }
}
</script>

<style></style>
