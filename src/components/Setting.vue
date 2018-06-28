<template>
    <div id="container">
        <div id="topbar">
            <h1>設定</h1>
        </div>
        <div id="content">
            <v-avatar size="120px">
                <img src="../assets/pain.jpg">
            </v-avatar>
                <p>ニックネーム</p>
                <input type="text" v-model="myName"/>
                <button @click="setName">変更</button>
                <p>メールアドレス</p>
        </div>
        <div id="containerup">
            <tabber id="tab" :cur="{frend:false,talk:false,setting:true}"/>
        </div>
    </div>
</template>
<script>
import Tabber from './Tabber'
import { auth } from '../firebase'
import {database} from '../firebase'

let frendsRef = database.ref('users')

export default {
    components:{
        Tabber
    },
    methods:{
        setName(){
            var frendRef = database.ref('users/'+this.user.uid+'/profile/name')
            frendRef.set(this.myName)
        }
    },
    data(){
        return{
            myName:'',
            user:null
        }
    }
}
</script>
<style scoped>
input[type=text] {
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
}
#content{
    position: relative;
    padding-bottom: 56px;
    padding-top: 56px;
}
#containerup{
    position: relative;
}
#container{
    width: 100%;
    position: relative;
    height: auto !important;
    height: 100%;
    min-height: 100%;
}
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
#tab{
    position: fixed;
	bottom: 0;
    right:0;
    left: 0;
    opacity: 1;
}
</style>




