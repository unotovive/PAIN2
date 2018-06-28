<template>
<div>
    <v-toolbar color="orange" dark>
        <v-btn icon @click="back">
        <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <v-toolbar-title>友だちを追加</v-toolbar-title>
    </v-toolbar>
    <div class="form">
        <v-form ref="form" v-model="valid" lazy-validation >
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-btn :disabled="!valid" @click="add" class="button">検索</v-btn>
        </v-form>
    </div>
    <popup v-if="showPop" @close="showPop=false" :mes="message"/>
</div>
</template>
<script>
import { database } from '../firebase'
import { auth } from '../firebase'
import { functions } from 'firebase';
export default {
    data(){
        return{
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'メールアドレスが必要です。',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'メールアドレスの形式が正しくありません'
            ],
            showPop:false,
            message:''
        }
    },
    components:{
    },
  methods: {
      popup(mes){
            console.log("noku")
            
        },
      getuid () {
            var user = auth.currentUser
            if(user != null){
            console.log("getuid")
            return auth.currentUser.uid
            }
        },
        add(){
            var can=false;
            var date = new Date() ;
            console.log(auth.currentUser.uid)
            database.ref('/users').orderByChild('profile/mail').startAt(this.email).endAt(this.email).once('value',function(snapshot) {
            if(!(snapshot.val()==null)){  
                console.log(snapshot.val())
                var talkKey=database.ref('talks/').push(
                        {   
                            id1:auth.currentUser.uid,
                            id2:String(Object.keys(snapshot.val())),
                            updateDate:date.getTime()
                        }).key
                database.ref('users/'+auth.currentUser.uid+'/frends').push({
                    id:String(Object.keys(snapshot.val())),
                    tid:talkKey
                    })
                database.ref('users/'+Object.keys(snapshot.val())+'/frends').push({
                    id:auth.currentUser.uid,
                    tid:talkKey
                    })
                alert("正常に友達に追加しました。")
                this.$router.push({ path: "/Top" });
                }else{
                    console.log("user not found")
                    alert("ユーザーが見つかりませんでした。")
                }
            })
        },
    back() {
      this.$router.push({ path: "/Top" });
    }
  }
};
</script>
<style scoped>
input{
    border-bottom: 1px solid;
}
.form{
    padding :50px;
}
.button {
  display: inline-block;
  margin: 0.3em;
  padding: 1.2em 5em;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 3px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -ms-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
  border: none; 
  font-size: 15px;
  text-align: center;
  background-color: rgb(250, 156, 16);
  color: white;
  height: 100%;;
}

.button:hover {
  box-shadow: 1px 6px 15px rgba(0,0,0,0.5);
}
</style>
