import '@/assets/styles/main.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios';

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_API_KEY}`;
Vue.prototype.$http = axios;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
