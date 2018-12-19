import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import EventCreate from '@/components/EventCreate'
import EventList from '@/components/EventList'
import UkmList from '@/components/UkmList'
import UkmListPengusaha from '@/components/UkmListPengusaha'
import UkmProduct from '@/components/UkmProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '*',
      redirect: 'dashboard'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/event/create',
      name: 'eventCreate',
      component: EventCreate
    },
    {
      path: '/event/list',
      name: 'eventList',
      component: EventList
    },
    {
      path: '/ukm/list',
      name: 'ukmList',
      component: UkmList
    },
    {
      path: '/ukm/list-pengusaha',
      name: 'ukmListPengusaha',
      component: UkmListPengusaha
    },
    {
      path: '/ukm/product',
      name: 'ukmProduct',
      component: UkmProduct
    },
    
  ]
})
