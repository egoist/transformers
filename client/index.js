import Vue from 'vue'
import VueRouter from 'vue-router'
import Revue from 'revue'
import store from './store'

Vue.use(VueRouter)
Vue.use(Revue, {
  store
})
if (__DEV__) {
  window.ReduxStore = store
}
const router = new VueRouter()
router.map({
  '/': {
    component: require('./views/home')
  }
})
router.start(require('./app'), '#app')
