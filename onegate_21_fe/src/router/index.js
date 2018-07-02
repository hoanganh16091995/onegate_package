import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/danh-sach-ho-so/:index', component: 'Landing', props: true },
  { path: '/danh-sach-ho-so/:index/tiep-nhan-ho-so/:id/:formCode', component: 'TiepNhanHoSo', props: true },
  { path: '/danh-sach-ho-so/:index/chi-tiet-ho-so/:id', component: 'XemChiTietHoSoDetail', props: true },
  { path: '/danh-sach-ho-so/:index/tra-ket-qua/:id', component: 'TraKetQuaDetail', props: true },
  { path: '/danh-sach-ho-so/:index/ho-so/:id/:formCode', component: 'DetailForward', props: true },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes
})

export default router
