import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/assets/styles/main.scss'
import axios from 'axios';

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_API_KEY}`;
axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.prototype.$http = axios;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
