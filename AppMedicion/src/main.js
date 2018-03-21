import Vue from 'vue'
import helper from './helper'
global.helper = helper
import config from './config'
import store from './store/'
global.store = store

import router from './router'
import i18n from './i18n/'
// import menu from './menu'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import './http'

import 'vuetify/src/stylus/main.styl'
import 'vuetify/src/stylus/settings/_colors.styl'
import '@/styles/main.styl'
import App from './App.vue'

import VueHighcharts from 'vue-highcharts'
Vue.use(VueHighcharts)

import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: config.locale,
  locales: {
    'en': require('vue-timeago/locales/en-US.json'),
    [config.locale]: require(`vue-timeago/locales/${config.locale}.json`)
  }
})

import Dropzone from 'vue2-dropzone'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
Vue.component('dropzone', Dropzone)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA2bAdTNf2ro3yHQyUWDZBKI_1DHDjk9jg',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

// import validator from 'indicative'
import validator from 'Validator'
global.validator = validator

import VForm from './components/Form.vue'
import VGrid from './components/Grid.vue'
import VField from './components/Field.vue'

// import Modal from './components/Modal'
// Vue.use(Modal)

Vue.component('v-form', VForm)
Vue.component('v-grid', VGrid)
Vue.component('v-field', VField)


import * as firebase from 'firebase'

var configfirebase = {
  apiKey: 'AIzaSyDuaWw7MIzM1nTDR0iID5xvKy2Dh3dTJns',
  authDomain: 'appmedicion-ucc.firebaseapp.com',
  databaseURL: 'https://appmedicion-ucc.firebaseio.com',
  projectId: 'appmedicion-ucc',
  storageBucket: 'appmedicion-ucc.appspot.com',
  messagingSenderId: '510414957297'
}

firebase.initializeApp(configfirebase)
var db = firebase.database(),
    auth = firebase.auth()
var proveedor = new firebase.auth.GoogleAuthProvider()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App),
  mounted () {
    // autentificacion
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.info('conectado', user)
          // User is signed in.
      } else {
        console.warn('no conectado')
          // No user is signed in.
      }
    })
  },

  methods: {
    conectar () {
      auth().signInWithPopup(proveedor).then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
          // The signed-in user info.
        var user = result.user
        // ...
      }).catch(function () {

      })
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    // this.$http.get('/users/1').then(({data}) => console.log(data))
  }
})
