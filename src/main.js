import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCurrency from 'vue-currency-filter'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import moment from 'moment'

//load CSS
import '../public/css/materialdesignicons.min.css'
import '../public/css/vendor.bundle.base.css'
import '../public/css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//load js
import '../public/js/vendor.bundle.base.js'
import '../public/js/polyfill.min.js'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCurrency, {
  name: 'rupiah',
  symbol : 'Rp',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).locale('id').format('D MMM YYYY') 
  }
})

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
