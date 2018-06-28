import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import HelloWorld from '@/components/HelloWorld'
import Title from '@/components/Title'
import Top from '@/components/Top'
import Signup from '@/components/Signup'
import Add from '@/components/Add'
import TalkList from '@/components/TalkList'
import Talk from '@/components/Talk'
import PTalk from '@/components/PTalk'
import Setting from '@/components/Setting'


Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Title',
      component: Title
    },
    {
      path: '/top',
      name: 'Top',
      component: Top
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/talklist',
      name: 'TalkList',
      component: TalkList
    },
    {
      path: '/talk/:id',
      name: 'Talk',
      component: Talk,
      props: true
    },
    {
      path: '/ptalk/:id',
      name: 'PTalk',
      component: PTalk,
      props: true
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      props: true
    }
  ]
})
