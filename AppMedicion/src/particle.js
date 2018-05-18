// inicializa Particle
var Id = '350045000d51353532343635'
var token = 'ffb366eb43a2003f2f01f5b8ebc8d0bb2f440cb0'

const API_URL = 'https://api.spark.io/v1/devices/'
var eventSource = new EventSource(API_URL + Id + '/events/?access_token=' + token)

eventSource.addEventListener('open', (e) => {
  console.log('conectado')
}, false)

eventSource.addEventListener('error', (e) => {
  console.log('Error!')
}, false)

/* eventSource.addEventListener('PushData', (e) => {
  var parsedData = JSON.parse(e.data)
  var data = JSON.parse(parsedData.data)
  this.Ubicacion = data.Gpsloc
  this.Polucion = data.Concentracion
  this.Gas = data.Gas
  this.Humedad = data.Humedad
  this.Temperatura = data.Temperatura
}, false) */

export const Particle = eventSource
