import {db} from './firebase'
import firebase from 'firebase'

require('firebase/auth')

export const mixin = {
  data: () => ({
    Ubicacion: '',
    medicion: null
  }),
  created: function () {
    this.conectarParticle()
  },
  methods: {
    autenticacion () {
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          console.log('usuario autenticado')
          this.$router.push({ path: `/` })
        } else {
          console.log('usuario no autenticado')
          this.$router.push({ path: `/login` })
        }
      })
    },
    conectarParticle () {
      // console.log('Conectando a Particle ..')
      var id = '350045000d51353532343635'
      var token = 'ffb366eb43a2003f2f01f5b8ebc8d0bb2f440cb0'

      const API_URL = 'https://api.spark.io/v1/devices/'
      var eventSource = new EventSource(API_URL + id + '/events/?access_token=' + token)

      eventSource.addEventListener('open', (e) => {
        console.log('Conectado!')
      }, false)

      eventSource.addEventListener('error', (e) => {
        console.log('Error!')
      }, false)

      eventSource.addEventListener('PushData', (e) => {
        var parsedData = JSON.parse(e.data)
        var data = JSON.parse(parsedData.data)
        this.Ubicacion = data.Gpsloc
        console.log(data.Gpsloc)
      }, false)
      return eventSource
    },
    guardarfirebase (lugar, Nombre, select) {
      db.ref('Mediciones/').push({
        Nombre: Nombre,
        Tipo: select,
        gps: this.Ubicacion,
        Lugar: lugar
      }).then((data) => {
      })
      var ref = db.ref('Mediciones/')
      ref.on('child_added', function (snap) {
        var valor = snap.val()
        console.log('added:', snap.key)
        this.medicion = {
          id: snap.key,
          Nombre: valor.Nombre,
          Tipo: valor.Tipo,
          gps: valor.gps,
          Lugar: valor.lugar
        }
      })
    }
  },
  mounted () {
  }
}
