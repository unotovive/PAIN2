<template>
    <div id="container">
            <div id="topbar">
                <button @click="$router.go(-1)">
                    <v-icon >arrow_back_ios</v-icon>
                </button>
                <h1>{{getGName()}}</h1>
            </div>
            <div class="talk">
                <chat v-for="chat in chats" :key="chat['.key']" :chat="chat"/>
            </div>
            <div class="botbar">
                <div class="msr_text_03">
                    <input type="text" v-model="message"/>
                    <button class="send" @click="send(message)">送信</button>
                </div>
            </div>
    </div>
</template>
<script>
import { auth } from '../firebase'
import { database } from '../firebase'
import Chat from './Chat'
var talkRef =database.ref('talks')
export default {
    props: ['id'],
    beforeCreate:function(){
        auth.onAuthStateChanged((user) => {
            var id=this.$route.params.id
            this.tid=id
            console.log(id)
            talkRef=database.ref(`talks/${id}/talk`)
            this.$bindAsArray('chats', database.ref(`talks/${id}/talk`))
        })
    },
    firebase:{
        chats:talkRef
    },
    components: {
        Chat
    },
    data(){
        return{
            message:'',
            tid:''
        }
    },
    methods:{
        getGName(){
            var talkRef = database.ref('talks/'+this.id)
            var name='';
            talkRef.orderByChild('id1').once('value',function(snapshot) {
                console.log(snapshot.val())
                var frendRef = database.ref('users/'+snapshot.val().id1+'/profile/name')
                frendRef.on('value', function(snapshot) {
                name+=snapshot.val();
                })
            })
                name+="&"
                talkRef.orderByChild('id2').once('value',function(snapshot) {
                var frendRef = database.ref('users/'+snapshot.val().id2+'/profile/name')
                frendRef.on('value', function(snapshot) {
                name+=snapshot.val();
                })
            })
            return name
        },
        send(message){
            if(!this.message==''){
                var date = new Date() ;
                var talkRef = database.ref('talks/'+this.id+'/talk')
                talkRef.push({
                    message:message,
                    time:date.getTime(),
                    from:auth.currentUser.uid
                })
                this.message=''
                this.scrollDown();
            }
        }
    }
}
</script>
<style scoped>
#topbar{
    position: fixed;
	top: 0;
    right:0;
    left: 0;
    background:#FF9800;
    box-shadow: 0 1px 10px #666;
    z-index: 10;
    padding: 5px;
    height: 58px;
    width:100%;
}
#topbar button{
    float: left;
    margin :10px;
    color:#EEE;
}
#topbar h1{
    font-size: 22px;
    margin :0 auto;
    padding :10px;
    color:#FFF;
}
.botbar{
    color:#999;
    border-top:1px solid ;
    position: fixed;
	bottom: 0;
    right:0;
    left: 0;
    height: 58px;
    width:100%;
    background: #E0E0E0;
    padding :10px;
    box-shadow: 0 1px 30px #666;
}
.talk{
    padding:5px;
    position: relative;
    padding-bottom: 65px;
    padding-top:65px;
}
#container{
    width: 100%;
    position: relative;
    height: auto !important;
    height: 100%;
    min-height: 100%;
}
#key{
    position: fixed;
	bottom: 0;
    right:0;
    left: 0;
    opacity: 1;
}
.msr_text_03 {
  width: 100%;
}
.msr_text_03 input[type=text] {
  background: #fff;
  border: 1px solid #D7D7D7;
  color:#444;
  box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
  -o-box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
  -ms-box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
  border-radius: 3px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-size: 16px;
  padding: 10px;
  width:80%;
  float: left;
}

.send{
    padding: 5px;
    background: #FF9800;
    color: #FFF;
    border-bottom: solid 4px #E65100;
    border-radius: 3px;
    width:13%;
    height: 100%;
    text-decoration: none;
}
.send:active{
    -ms-transform: translateY(4px);
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    border-bottom: none;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);/*影を小さく*/
}
</style>
