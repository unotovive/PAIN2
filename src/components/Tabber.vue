<template>
<div>
    <div class="bar" v-if="frend">
        <button @click="toTop" class="cur">
            <v-icon>supervised_user_circle</v-icon>
            <span>友だち</span>
        </button>
        <button @click="toTalk">
            <v-icon>chat</v-icon>
            <span>トーク</span>
        </button>
        <button @click="logout">
            <v-icon>exit_to_app</v-icon>
            <span>ログアウト</span>
        </button>
    </div>
    <div class="bar" v-if="talk">
        <button @click="toTop">
            <v-icon>supervised_user_circle</v-icon>
            <span>友だち</span>
        </button>
        <button @click="toTalk" class="cur">
            <v-icon>chat</v-icon>
            <span>トーク</span>
        </button>
        <button @click="logout">
            <v-icon>exit_to_app</v-icon>
            <span>ログアウト</span>
        </button>
    </div>
    <div class="bar" v-if="setting">
        <button @click="toTop">
            <v-icon>supervised_user_circle</v-icon>
            <span>友だち</span>
        </button>
        <button @click="toTalk">
            <v-icon>chat</v-icon>
            <span>トーク</span>
        </button>
        <button @click="logout">
            <v-icon>exit_to_app</v-icon>
            <span>ログアウト</span>
        </button>
    </div>
    </div>
</template>
  
  <script>
import { auth } from '../firebase'
export default {
    props:['cur'],
    data(){
        return{
            frend:this.cur.frend,
            talk:this.cur.talk,
            setting:this.cur.setting
        }
    },
    methods:{
        toTop(){
            this.$router.push({path:'/Top'})
        },
        toTalk(){
            this.$router.push({path:'/TalkList'})
        },
        toSet(){
            this.$router.push({path:'/Setting'})
        },
        logout(){
            auth.signOut().then(function() {
             console.log("Signed out.")
             
             });
             this.$router.push({path:'/'})
        }
    }
}
</script>
<style scoped>
.bar{
    width:100%;
    height: 58px;
    box-shadow: 0 1px 30px #666;
    background: #FFF;
}
.bar button{
    width: 30%;
    color:#BABABA;
    padding :5px;
}
.bar button v-icon{
    display: block;
}
.bar button span{
    display: block;
}
.cur{
    color:#FF9800 !important;
}
</style>