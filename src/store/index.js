import Vue from 'vue'
import Vuex from 'vuex'
import location from './location'
import orderInfo from './orderInfo'
import userInfo from './userInfo'
import remarkInfo from './remarkInfo'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    location,
    orderInfo,
    userInfo,
    remarkInfo
  }
})