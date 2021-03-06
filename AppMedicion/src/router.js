import Vue from 'vue'
import Router from 'vue-router'

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: require(`./pages/${file}.vue`)
  }
}

Vue.use(Router)

const router = new Router({
  base: __dirname,
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    route('/login', 'Login', 'login'),

    // path, file(*.vue), name, children

    route('/', 'Main', null, [
      route('/', 'Home', 'Inicio'),
      route('/Mediciones', 'Mediciones'),
      route('/Mapas', 'Mapas'),
      route('/Nueva/medicion', 'CrudGrid'),
      route('/detalle/medicion/:Id', 'Medicion_detalle'),
      route('/detalle/medicion/graficas/:Id', 'Medicion_detalle_grafica', 'detalle_grafica')
    ])

    // Global redirect for 404
    // { path: '*', redirect: '/error', query: {code: 404, message: 'Page Not Found.'} }
  ]
})

router.beforeEach((to, from, next) => {
  global.store.dispatch('checkPageTitle', to.path)
  /* eslint-disable no-undef */
  if (typeof ga !== 'undefined') {
    ga('set', 'page', to.path)
    ga('send', 'pageview')
  }
  next()
})

export default router
