<template>
  <div>
    Play the game
    <pre>{{isRoomMaster}}</pre>
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
    gameParser(game) {
      let newGame = {
        corrects: [],
        members: [],
        questions: {},
        roomMaster: {}
      };

      newGame.roomMaster = JSON.parse(game.roomMaster);
      newGame.questions = JSON.parse(game.questions);

      game.members.forEach(el => {
        let member = JSON.parse(el);
        newGame.members.push(member);
      });

      game.corrects.forEach(el => {
        let member = JSON.parse(el);
        newGame.corrects.push(member);
      });

      return newGame;
    },
    getDataGame() {
      this.token = JSON.parse(localStorage.getItem("token"));
      
      db.collection("quizilla")
        .doc(this.roomID)
        .onSnapshot(snapshot => {
          if (snapshot.data()) {
            let roomData = snapshot.data();
            this.game = this.gameParser(roomData);
            
            this.isRoomMaster = (this.token.token === this.game.roomMaster.token) ? true : false;
            
            // Cek apakah merupakan member / siRoomMaster
            let found = false;
            for(let i = 0; i < this.game.members.length; i++) {
              if (this.game.members[i].token == this.token.token) {
                found = true;
                break;
              }
            }
            
            if(found || this.isRoomMaster) {
              // Ok bisa maen
              console.log('ok kamu boleh maen');
            } else {
              console.log("Kamu tidak memiliki hak maen di room ini");
            }
          } else {
            // Redirect ke menu utama
            console.log("Room tidak ada");
          }
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