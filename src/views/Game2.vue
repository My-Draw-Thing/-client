<template>
  <div class="w-full h-screen flex flex-col">
    <div class="bg-color"></div>
    <div class="w-full h-full flex z-10">
      <div class="w-1/5 flex justify-center items-center"><div v-if="isRoomMaster">{{gameTime}}</div></div>
      <div class="w-3/5 flex justify-center items-center">
        <img :src="game.questions.image" alt="img">
        
        <p>{{game.questions.question}}</p>
      </div>
      <div class="w-1/5 flex justify-center items-center">{{ userState }}</div>
    </div>
    <div class="w-full flex flex-wrap mt-auto z-10" v-if="!isRoomMaster">
      
      <button v-for="answare in game.questions.answare" :key="'bukanmaster'+answare" @click="submitAnsware(answare)">{{answare}}</button>
      
      <AnswerCard :color="'red'"></AnswerCard>
      <AnswerCard :color="'blue'"></AnswerCard>
      <AnswerCard :color="'yellow'"></AnswerCard>
      <AnswerCard :color="'green'"></AnswerCard>
    </div>
    
    <div class="w-full flex flex-wrap mt-auto z-10" v-if="isRoomMaster">
      
       <span v-for="answare in game.questions.answare" :key="'master'+answare">{{answare}} | </span>
       
      <AnswerCard :color="'red'"></AnswerCard>
      <AnswerCard :color="'blue'"></AnswerCard>
      <AnswerCard :color="'yellow'"></AnswerCard>
      <AnswerCard :color="'green'"></AnswerCard>
    </div>
  </div>
</template>

<script>
import AnswerCard from '../components/AnswerCard'
import db from '@/apis/firebase'
const {quizilla, questions} = db

export default {  
  data() {
    return {
      // Dari state / localstorage
      roomID: localStorage.getItem('roomID') || "defaultAcakKaloBelumMasukRoom",
      token: {},
      isRoomMaster: false,
      
      questions: [],
      
      gameTime: 5,
      
      round: 0,
      
      // Info room
      game: {}
    };
  },
  components: {
    AnswerCard
  },
  methods: {
    getDataGame() {
      this.token = JSON.parse(localStorage.getItem("token"));
      
      quizilla
        .doc(this.roomID)
        .onSnapshot(snapshot => {
          if (snapshot.data()) {
            let roomData = snapshot.data();
            this.game = roomData;
            
            this.isRoomMaster = (this.token.token === this.game.roomMaster.token) ? true : false;
            
            if(this.isRoomMaster) {
              this.setTime();
            }
            
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
                this.$router.push('lobby');              
              // console.log("Kamu tidak memiliki hak maen di room ini");
            }
          } else {
            // Redirect ke menu utama
                this.$router.push('lobby');            
            // console.log("Room tidak ada");
          }
        });
    },
    submitAnsware(answare) {
      if(answare === this.game.questions.correct) {
        let getLocalToken = JSON.parse(localStorage.getItem('token'));
        
        quizilla
        .doc(this.roomID)
        .update({
          corrects: firebase.firestore.FieldValue.arrayUnion(getLocalToken)
        })
      }
    },
    setTime() {
      let counter = this.gameTime;
      
      let gameCounter = setInterval(() => {
        this.gameTime--;
        
          if(this.gameTime === 0) {
            this.nextQuest();
            clearInterval(gameCounter);
          }
      }, 1000);
    },
    nextQuest() {
      this.round++;
      let dataNow = this.getQuestionsState[this.round];
      
      quizilla
          .doc(this.roomID)
          .update({isPlay: true, questions: { answare: dataNow.answare, correct: dataNow.correct, image: dataNow.image, question: dataNow.question }});
          
      this.gameTime = 5;
    }
  },
  computed: {
    getQuestionsState () {
      return this.$store.state.questions;  
    }
  },
  created() {
    this.getDataGame();    
  }
}
</script>

<style>
.bg-color {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #dfdce3;
}
</style>
