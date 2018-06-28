<template>
<div>
    <div class="kaiwa" v-if="isMe()">
        <figure class="kaiwa-img-right">
            <img src="../assets/pain.jpg">
            <figcaption class="kaiwa-img-description">{{getName(chat.from)}}</figcaption>
        </figure>
        <div class="kaiwa-text-left">
            <p class="kaiwa-text">
                {{chat.message}}
            </p>
        </div>
    </div>
    <div class="kaiwa" v-if="!isMe()">
        <figure class="kaiwa-img-left">
            <img src="../assets/pain.jpg">
            <figcaption class="kaiwa-img-description">{{getName(chat.from)}}</figcaption>
        </figure>
        <div class="kaiwa-text-right">
            <p class="kaiwa-text">
                {{chat.message}}
            </p>
        </div>
    </div>
</div>
</template>
<script>

import { database } from '../firebase'
import { auth } from '../firebase'


export default {
    props:['chat'],
    methods:{
        isMe(){
            if(this.chat.from==auth.currentUser.uid){
                return true;
            }
            else{
                return false;
            }
        },
         getName(id){
            var frendRef = database.ref('users/'+id+'/profile/name')
            var name='';
            frendRef.on('value', function(snapshot) {
                name=snapshot.val();
            })
        return name;
        },
    }
}
</script>
<style scoped>
/*——————–
 吹き出しを作る
——————–*/
/* 全体のスタイル */
.kaiwa {
  margin-bottom: 15px;
  margin-top:15px;
}
/* 左画像 */
.kaiwa-img-left {
  margin: 0;
  float: left;
  width: 50px;
  height: 50px;
  margin-right: -70px;
}
/* 右画像 */
.kaiwa-img-right {
  margin: 0;
  float: right;
  width: 50px;
  height: 50px;
  margin-left: -70px;
}
.kaiwa figure img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin: 0;
}
/* 画像の下のテキスト */
.kaiwa-img-description {
  padding: 5px 0 0;
  font-size: 10px;
  text-align: center;
  position: relative;
  bottom: 5px;
}
/* 左からの吹き出しテキスト */
.kaiwa-text-right {
  position: relative;
  margin-left: 65px;
  padding: 10px;
  border-radius: 10px;
  background: #eee;
  margin-right: 12%;
  float: left;
  word-break: break-all;
}
/* 右からの吹き出しテキスト */
.kaiwa-text-left {
  position: relative;
  margin-right: 65px;
  padding: 10px;
  border-radius: 10px;
  background-color: #9cd6e7;
  margin-left: 12%;
  float: right;
  word-break: break-all;
}
p.kaiwa-text {
  margin: 0 0 20px;
}
p.kaiwa-text:last-child {
  margin-bottom: 0;
}
/* 左の三角形を作る */
.kaiwa-text-right:before {
  position: absolute;
  content: '';
  border: 7px solid transparent;
  top: 10px;
  left: -20px;
}
.kaiwa-text-right:after {
  position: absolute;
  content: '';
  border: 10px solid transparent;
  border-right: 10px solid #eee;
  top: 10px;
  left: -19px;
}
/* 右の三角形を作る */
.kaiwa-text-left:before {
  position: absolute;
  content: '';
  border: 10px solid transparent;
  top: 10px;
  right: -20px;
}
.kaiwa-text-left:after {
  position: absolute;
  content: '';
  border: 10px solid transparent;
  border-left: 10px solid #9cd6e7;
  top: 10px;
  right: -19px;
}
/* 回り込み解除 */
.kaiwa:after,.kaiwa:before {
  clear: both;
  content: "";
  display: block;
}
</style>

