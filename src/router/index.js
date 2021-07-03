import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
//layouts
import Header from '../views/layouts/Header.vue'
import Footer from '../views/layouts/Footer.vue'

// auth
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

// pages
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Pembayaran from '../views/Pembayaran.vue'
import Laporan from '../views/Laporan.vue'
import LaporanDetail from '../views/Laporan Detail.vue'
import LaporanCreate from '../views/Laporan Create.vue'
import LaporanEdit from '../views/Laporan Edit.vue'
import Pengiriman from '../views/Pengiriman.vue'
import Sertifikat from '../views/Sertifikat.vue'
import SertifikatCreate from '../views/Sertifikat Create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/create/:id',
    name: 'Create Certificate',
    components: {default: SertifikatCreate, footer: Footer, header: Header},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/sertifikat',
    name: 'Sertifikat',
    components: {default: Sertifikat, footer: Footer, header: Header},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/laporan/pengiriman/:id_pembayaran',
    name: 'Pengiriman',
    components: {default: Pengiriman, footer: Footer, header: Header},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/laporan/:id_pembayaran/:id_laporan',
    name: 'reportEdit',
    components: {default: LaporanEdit, footer: Footer, header: Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/laporan/create',
    name: 'reportCreate',
    components: {default: LaporanCreate, footer: Footer, header: Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/laporan/:id_pembayaran',
    name: 'reportDetail',
    components: {default: LaporanDetail, footer: Footer, header: Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/laporan',
    name: 'Laporan',
    components: {default: Laporan, footer: Footer, header: Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pembayaran',
    name: 'Pembayaran',
    components: {default: Pembayaran, footer: Footer, header: Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    components: {default: Dashboard, footer: Footer, header: Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    components: {default: Register, footer: Footer, header: Header}
  },
  {
    path: '/login',
    name: 'Login',
    components: {default: Login, footer: Footer, header: Header}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
