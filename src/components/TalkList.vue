<template>
        <div id="container">
            <div id="topbar">
                <h1>トーク</h1>
            </div>
            <div id="content">
                    <v-subheader>パブリックグループ</v-subheader>
                    <v-divider></v-divider>
                    <v-list>
                    <v-list-tile avatar @click="toPTalk()">
                        <v-list-tile-avatar>
                        <img src="../assets/pain.jpg">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title>{{pName}}</v-list-tile-title>
                        <v-list-tile-sub-title>this is public group</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">chat</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    </v-list>

                    <v-subheader>トーク</v-subheader>
                    <v-list>
                    <v-list-tile v-for="frend in frends" :key="frend['.key']" avatar @click="toTalk(frend)">
                        <v-list-tile-avatar>
                        <img src="../assets/pain.jpg">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title>{{getName(frend.id)}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{getLastTalk(frend.tid)}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">chat</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    </v-list>
            </div>
            
            <div id="containerup">
                <tabber id="tab" :cur="{frend:false,talk:true,setting:false}"/>
            </div>
        </div>
</template>
<script>
import { auth } from '../firebase'
import Tabber from './Tabber'
import Dialogs from './Dialogs'
import {database} from '../firebase'

let frendsRef = database.ref('users')
let pubRef = database.ref('users')

export default {
    components: {
      Tabber
    },
    data () {
      return {
        showDialog: false,
        showDialogMe: false,
        selectedFrend:null,
        e1: 'frnd',
        myName:'',
        myMail:'',
        pName:''
      }
    },
    beforeCreate:function(){
        auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user
          this.$bindAsArray('frends', database.ref(`users/${user.uid}/frends`))
          var name='';
          var frendRef = database.ref('users/'+user.uid+'/profile/name')
            var name='';
            frendRef.on('value', function(snapshot) {
            console.log(snapshot.val());
            name=snapshot.val();
            })
        this.myName=name
        this.myMail=user.email
        var pubRef = database.ref('users/'+user.uid+'/public/name')
        var pName='';
            pubRef.on('value', function(snapshot) {
            console.log(snapshot.val());
            pName=snapshot.val();
            })
        this.pName=pName
        }
      })
    },
    firebase:{
        frends:frendsRef,
    },
    methods:{
        getPName(id){
            var pubRef = database.ref('users/'+id+'/public/name')
            var name='';
            frendRef.on('value', function(snapshot) {
                name=snapshot.val();
            })
            return name
        },
        toTalk(frend){
            this.$router.push({path:`/Talk/${frend.tid}`})
        },
        toPTalk(){
            var pubRef = database.ref('users/'+auth.currentUser.uid+'/public/tid')
            var ptid='';
            pubRef.on('value', function(snapshot) {
            console.log(snapshot.val());
            ptid=snapshot.val();
            })
            this.$router.push({path:`/ptalk/${ptid}`})
        },
        dialogMe(){
            this.showDialogMe=true
        },
        dialog(frend){
            this.selectedFrend=frend
            this.showDialog=true
        },
        getName(id){
            var frendRef = database.ref('users/'+id+'/profile/name')
            var name='';
            frendRef.on('value', function(snapshot) {
                name=snapshot.val();
            })
        return name;
        },
        getMail(id){
            var frendRef = database.ref('users/'+id+'/profile/mail')
            var mail=''
            frendRef.on('value', function(snapshot) {
                mail=snapshot.val();
            })
        return mail
        },
        getLastTalk(tid){
            var mes='';
            console.log(tid)
            var talkRef = database.ref('talks/'+tid+'/talk')
            talkRef.orderByChild('time').equalTo(1530171690551).on('value', function(snapshot) {
                console.log("snap"+snapshot.val())
                mes=snapshot.val().message
            });
            return mes;
        },
        toAdd(){
            this.$router.push({path:'/Add'})
        },
        logout(){
            auth.signOut().then(function() {
             console.log("Signed out.")
             
             });
             this.$router.push({path:'/Title'})
        },
        getuid(){
            var user = auth.currentUser
            if(user != null){
            console.log("getuid")
            return auth.currentUser.uid
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
    height: 56px;
    width:100%;
}

#topbar h1{
    font-size: 22px;
    margin :0 auto;
    padding :10px;
    color:#FFF;
    float: left;
}
.z-top{
    position: relative;
    z-index: 100;
}
.z-bot{
    position: relative;
    z-index: 0;
}
#container{
    width: 100%;
    position: relative;
    height: auto !important;
    height: 100%;
    min-height: 100%;
}
#containerup{
    position: relative;
}
#content{
    position: relative;
    padding-bottom: 56px;
    padding-top: 56px;
}
#tab{
    position: fixed;
	bottom: 0;
    right:0;
    left: 0;
    opacity: 1;
}
</style>