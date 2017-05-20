import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import { routes } from './routes'

Vue.use(VueAxios,axios)
Vue.use(VueRouter)
Vue.use(iView)


const router = new VueRouter({
	routes,
	mode:'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
