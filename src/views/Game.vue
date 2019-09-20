<template>
  <div>
      das
  </div>
</template>

<script>
import db from "@/apis/firebase";

export default {
  name: "play",
  data() {
    return {
      // Dari state / localstorage
      roomID: "enMBB2kvUvFQyg0d3gQb" || "defaultAcakKaloBelumMasukRoom",
      token: {},
      isRoomMaster: false,
      
      // Info room
      game: {}
    };
  },
  methods: {
    getDataGame() {
      this.token = JSON.parse(localStorage.getItem("token"));
      
      db.collection("quizilla")
        .doc(this.roomID)
        .onSnapshot(snapshot => {
          if (snapshot.data()) {
            let roomData = snapshot.data();
            this.game = roomData;
            console.log(roomData);
            this.isRoomMaster = (this.token.token === this.game.roomMaster.token) ? true : false;
            
            // Cek apakah merupakan member / siRoomMaster
            let found = false;
            for(let i = 0; i < this.game.users.length; i++) {
              if (this.game.users[i].token == this.token.token) {
                found = true;
                break;
              }
            }
            
            if(found || this.isRoomMaster) {
              // Ok bisa maen
              if(this.game.isPlay === false) {
                this.$router.push('play');
              }
            } else {
              console.log("Kamu tidak memiliki hak maen di room ini");
            }
          } else {
            // Redirect ke menu utama
            console.log("Room tidak ada");
          }
        });
    },
    getQuestions() {
      db.collection("questions").get()
      .then((data) => {
        let tmpQuestion = [];
        data.forEach(el => {
          tmpQuestion.push(el.data());
        });

        console.log(tmpQuestion);
      }).catch((err) => {
        
      });
    }
  },
  created() {
    this.getDataGame();
  }
};
</script>

<style>

</style>