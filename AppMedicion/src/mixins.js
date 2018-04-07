import {db} from './firebase'

export const mixin = {
  data: () => ({
    Ubicacion: ''
  }),
  created: function () {
    this.conectarParticle()
  },
  methods: {
    conectarParticle () {
      console.log('Conectando a Particle ..')
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

      eventSource.addEventListener('Concentration', (e) => {
        var parsedData = JSON.parse(e.data)
        var Medicion = []
        var Concentracion = '{\'Nombre\': ' + 'Concentracion' + ', \'dato\': ' + parsedData.data + '}'
        Medicion.push(Concentracion)
        console.log(Medicion[0])
      }, false)

      eventSource.addEventListener('gpsloc', (e) => {
        var parsedData = JSON.parse(e.data)
        var Medicion = []
        var gps = '{\'Nombre\': ' + 'Gps' + ', \'dato\': ' + parsedData.data + '}'
        Medicion.push(gps)
        console.log(Medicion[0])
      }, false)

      eventSource.addEventListener('Temperatura', (e) => {
        var parsedData = JSON.parse(e.data)
        var Medicion = []
        var temperatura = '{\'Nombre\': ' + 'Temperatura' + ', \'dato\': ' + parsedData.data + '}'
        Medicion.push(temperatura)
        console.log(Medicion[0])
      }, false)

      eventSource.addEventListener('Humedad', (e) => {
        var parsedData = JSON.parse(e.data)
        var Medicion = []
        var humedad = '{\'Nombre\': ' + 'Humedad' + ', \'dato\': ' + parsedData.data + '}'
        Medicion.push(humedad)
        console.log(Medicion[0])
      }, false)

      eventSource.addEventListener('ppm', (e) => {
        var parsedData = JSON.parse(e.data)
        var Medicion = []
        var ppm = '{\'Nombre\': ' + 'PPM' + ', \'dato\': ' + parsedData.data + '}'
        Medicion.push(ppm)
        console.log(Medicion[0])
      }, false)
      return eventSource
    },
    guardarfirebase (lugar) {
      var evento = this.conectarParticle()
      var gps
      evento.addEventListener('gpsloc', (e) => {
        var parsedData = JSON.parse(e.data)
        gps = parsedData.data
        console.log(gps)
      }, false)

      db.ref('Mediciones/').push({
        Nombre: 'rey',
        Apellidos: 'nacinal',
        Edad: 12,
        Ubicacion: lugar,
        gps: {gps:this.gps}
      })
    }
  }
}
