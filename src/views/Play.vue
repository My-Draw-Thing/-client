<template>
  <div>
    Play the game
    <br>
    <br>    
    <strong>List Players</strong>
    <ul>
      <li v-for="game in game.users" :key="game.token">{{game.name}}</li>
    </ul>
    
    <button @click="play" v-if="isRoomMaster">Start</button>
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
              if(this.game.isPlay) {
                this.$router.push('game');
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
    play() {
      
      db.collection("questions").get()
      .then((data) => {
        let tmpQuestion = [];
        data.forEach(el => {
          tmpQuestion.push(el.data());
        });
    
    
        db.collection("quizilla")
          .doc(this.roomID)
          .update({isPlay: true, questions: { answare: tmpQuestion[0].answare, correct: tmpQuestion[0].correct, image: tmpQuestion[0].image, question: tmpQuestion[0].question }})
          
        this.$store.commit('addQuestions', tmpQuestion)
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