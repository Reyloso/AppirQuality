import {db} from './firebase'
import firebase from 'firebase'

require('firebase/auth')

export const mixin = {
  data: () => ({
    Ubicacion: '',
    Polucion: '',
    Temperatura: '',
    Humedad: '',
    Gas: '',
    medicion: null,
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y'
  }),
  created: function () {
    this.autenticacion()
    this.conectarParticle()
  },
  computed: {
  },
  methods: {
    autenticacion () {
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
        } else {
          this.$router.push({ path: `/login` })
        }
      })
    },
    conectarParticle () {
      // console.log('Conectando a Particle ..')
      var Id = '350045000d51353532343635'
      var token = 'ffb366eb43a2003f2f01f5b8ebc8d0bb2f440cb0'

      const API_URL = 'https://api.spark.io/v1/devices/'
      var eventSource = new EventSource(API_URL + Id + '/events/?access_token=' + token)

      eventSource.addEventListener('open', (e) => {
      }, false)

      eventSource.addEventListener('error', (e) => {
        console.log('Error!')
      }, false)

      eventSource.addEventListener('PushData', (e) => {
        var parsedData = JSON.parse(e.data)
        var data = JSON.parse(parsedData.data)
        this.Ubicacion = data.Gpsloc
        this.Polucion = data.Concentracion
        this.Gas = data.Gas
        this.Humedad = data.Humedad
        this.Temperatura = data.Temperatura
      }, false)
      return eventSource
    },
    cerrar () {
      var cerrar = this.conectarParticle()
      cerrar.close()
    },
    guardarfirebase (lugar, Nombre, select) {
      var user = firebase.auth().currentUser
      var date = new Date()
      var fecha = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
      var lat = this.Ubicacion.lat
      var lng = this.Ubicacion.lng
      db.ref('Mediciones/').push({
        Nombre: Nombre,
        Tipo: select,
        Gps: {
          lat: lat,
          lng: lng
        },
        Lugar: lugar,
        Fecha: fecha,
        Usuario: user.displayName
      }).then((data) => {
      })
    },
    guardarMuestra (key) {
      var polucion = Number(this.Polucion)
      var gas = Number(this.Gas)
      var temperatura = Number(this.Temperatura)
      var humedad = Number(this.Humedad)
      var lat = Number(this.Ubicacion.lat)
      var lng = Number(this.Ubicacion.lng)
      var date = new Date()
      var hora = Number(date.getHours() + '.' + date.getMinutes())
      console.log(hora)
      db.ref('Mediciones/' + key + '/Muestras').push({
        Hora: hora,
        Polucion: polucion,
        Temperatura: temperatura,
        Humedad: humedad,
        Gas: gas,
        Gps: {
          lat: lat,
          lng: lng
        }
      }).then((data) => {
        console.log('guardado exitoso')
      })
    }
  },
  mounted () {
  },
  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    }
  }
}
