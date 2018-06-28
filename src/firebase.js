import firebase from 'firebase'
import vuefire from 'VueFire'
const config = {
    apiKey: "AIzaSyA_8ui9DN81YEs6AEPHoXMkU6M1qjRSdsM",
    authDomain: "line-no-pakuri.firebaseapp.com",
    databaseURL: "https://line-no-pakuri.firebaseio.com",
    projectId: "line-no-pakuri",
    storageBucket: "line-no-pakuri.appspot.com",
    messagingSenderId: "1073038863665"
  }
  firebase.initializeApp(config)
  export const database = firebase.database();
  export const ref = database.ref();
  export const auth = firebase.auth();