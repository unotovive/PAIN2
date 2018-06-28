<template>
        <div id="container">
            <div id="topbar">
                <h1>友だち</h1>
                <button @click="$router.push({path:'/Add'})">
                    <v-icon>person_add_ios</v-icon>
                </button>
            </div>
            <div id="content">
                <v-card>
                    

                    <v-list two-line subheader>
                    <v-subheader>プロフィール</v-subheader>
                    <v-list-tile avatar @click="dialogMe()">
                        <v-list-tile-avatar>
                        <img src="../assets/pain.jpg">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title>{{myName}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{myMail}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-divider inset></v-divider>
                    <v-subheader>友だちリスト</v-subheader>
                    <v-list-tile v-for="frend in frends" :key="frend['.key']" avatar @click="dialog(frend)">
                        <v-list-tile-avatar>
                        <img src="../assets/pain.jpg">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title>{{getName(frend.id)}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{getMail(frend.id)}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    </v-list>
                </v-card>
            </div>
            
            <div id="containerup">
                <tabber id="tab" :cur="{frend:true,talk:false,setting:false}"/>
            </div>
            <div id="containerup">
                <dialogs id="dialogs" v-if="showDialog" @close="showDialog=false" :frend="selectedFrend"/>
                <dialogs-me id="dialogsMe" v-if="showDialogMe" @close="showDialogMe=false" :me="{name:myName,mail:myMail}"/>
            </div>
        </div>
</template>
<script>
import { auth } from '../firebase'
import Tabber from './Tabber'
import Dialogs from './Dialogs'
import DialogsMe from './DialogsMe'
import {database} from '../firebase'

let frendsRef = database.ref('users')

export default {
    components: {
      Tabber,
      Dialogs,
      DialogsMe
    },
    data () {
      return {
        showDialog: false,
        showDialogMe: false,
        selectedFrend:null,
        e1: 'frnd',
        myName:'',
        myMail:''
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
        }
      })
    },
    firebase:{
        frends:frendsRef
    },
    methods:{
        
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
#topbar button{
    float: right;
    margin :10px;
    color:#EEE;
    width:30px;
    height:30px;
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
#dialogs{
}
#dialogsMe{
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
