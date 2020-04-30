import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from './api/apiConfig'

//Mint-UI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';


Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')