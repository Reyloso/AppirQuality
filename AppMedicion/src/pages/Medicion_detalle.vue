<template>
  <v-container  grid-list-xl>
      <v-layout>
    <v-flex xs12 sm12 d-inline-block>
      <v-card>
        <v-card-media
          class="white--text"
          height="300px">
        <gmap-map
      :center="center"
      :zoom="16"
      style="width: 100%; height: 500px; padding-top:0px;">
      <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"

      ></gmap-marker>
      </gmap-map>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h4>{{NombreM}}</h4>
            <p>Lugar: {{LugarM}}</p>
            <p>Fecha de creacion: {{FechaM}}</p>
            <p>Tipo Medicion: {{TipoM}}</p>
            <p>Usuario: {{UsuarioM}}</p>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>

  <v-layout>
    <v-flex xs12 sm12 d-inline-block>

      <v-card>
        <v-card-title>
          <v-btn color="primary" @click="AddMuestra()" class="mb-2 add button-add-new">Agregar Muestra</v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
            v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table
       :headers="headers"
       :items="items"
       class="elevation-1"
       prev-icon="mdi-menu-left"
       next-icon="mdi-menu-right"
       sort-icon="mdi-menu-down"
       :search="search">
       <template slot="items" slot-scope="props">
        <td>{{ props.item.Id }}</td>
         <td class="text-xs-right">{{ props.item.Hora }}</td>
         <td class="text-xs-right">{{ props.item.Polucion }}</td>
         <td class="text-xs-right">{{ props.item.Humedad }}</td>
         <td class="text-xs-right">{{ props.item.Temperatura }}</td>
         <td class="text-xs-right">{{ props.item.Gas }}</td>
         <td class="justify-center layout px-0">
           <v-btn icon class="mx-0" @click="editItem(props.item)">
             <v-icon class="button-edit" color="teal">edit</v-icon>
           </v-btn>
           <v-btn icon class="mx-0" @click="deleteItem(props.item)">
             <v-icon class="button-delete" color="pink">delete</v-icon>
           </v-btn>
         </td>
       </template>
       <v-alert slot="no-results" :value="true" color="error" icon="warning">
         Your search for "{{ search }}" found no results.
       </v-alert>
     </v-data-table>
    </v-card>
  </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12 sm12 d-inline-block>
      <v-card>
        <v-card-media
          class="white--text"
          height="400px">
      <highcharts :options="Temperatura" ref="highcharts"></highcharts>
      </v-card-media>
    </v-card>
  </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12 sm12 d-inline-block>
      <v-card>
        <v-card-media
          class="white--text"
          height="400px">
      <highcharts :options="Humedad" ref="highcharts"></highcharts>
      </v-card-media>
    </v-card>
  </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12 sm12 d-inline-block>
      <v-card>
        <v-card-media
          class="white--text"
          height="400px">
      <highcharts :options="Gas" ref="highcharts"></highcharts>
      </v-card-media>
    </v-card>
  </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12 sm12 d-inline-block>
      <v-card>
        <v-card-media
          class="white--text"
          height="400px">
      <highcharts :options="Polucion" ref="highcharts"></highcharts>
      </v-card-media>
    </v-card>
  </v-flex>
  </v-layout>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="150">
      <v-card>
        <div>
          <v-progress-circular
            :size="100"
            :width="15"
            :rotate="360"
            :value="value"
            color="teal"
          >
            {{ value }}
          </v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import firebase from 'firebase'
import {mixin} from '../mixins'
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highstock'

Vue.use(VueHighcharts, { Highcharts })

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA2bAdTNf2ro3yHQyUWDZBKI_1DHDjk9jg',
    v: '3'
  }
})
export default {
  mixins: [mixin],
  data () {
    return {
      Humedad: { // aqui cocmienza grafica de humedad
        chart: {
          type: 'area'
        },
        title: {
          text: 'Grafica De Medicion De Humedad'
        },
        subtitle: {
          text: 'Medicion De Calidad Del Aire'
        },
        xAxis: {
          title: { text: 'Tiempo'
          },
          labels: {
            format: '{value} ' + 'H:m'
          }
        },
        yAxis: {
          title: {
            text: 'Humedad'
          },
          labels: {
            formatter: function () {
              return this.value + '%'
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y:,.0f} %</b><br/>Hora: {point.x}'
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: 'Humedad',
          data: []
        }]
      }, // aqui termina
      Gas: { // aqui cocmienza grafica de Gas
        chart: {
          type: 'area'
        },
        title: {
          text: 'Grafica De Medicion De Gas'
        },
        subtitle: {
          text: 'Medicion De Calidad Del Aire'
        },
        xAxis: {
          title: { text: 'Tiempo'
          },
          labels: {
            format: '{value} ' + 'H:m'
          }
        },
        yAxis: {
          title: {
            text: 'Gas'
          },
          labels: {
            formatter: function () {
              return this.value + ' PPM'
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y:,.0f} PPM</b><br/>Hora: {point.x}'
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: 'Gas',
          data: []
        }]
      }, // aqui termina
      Polucion: { // aqui cocmienza grafica de Polucion
        chart: {
          type: 'area'
        },
        title: {
          text: 'Grafica De Medicion De Polucion'
        },
        subtitle: {
          text: 'Medicion De Calidad Del Aire'
        },
        xAxis: {
          title: { text: 'Tiempo'
          },
          labels: {
            format: '{value} ' + 'H:m'
          }
        },
        yAxis: {
          title: {
            text: 'Concentracion'
          },
          labels: {
            formatter: function () {
              return this.value + ' Concentracion'
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y:,.0f} PPM</b><br/>Hora: {point.x}'
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: 'Polucion',
          data: []
        }]
      }, // aqui termina
      Temperatura: { // aqui cocmienza grafica de humedad
        chart: {
          type: 'area'
        },
        title: {
          text: 'Grafica De Medicion De Temperatura'
        },
        subtitle: {
          text: 'Medicion De Calidad Del Aire'
        },
        xAxis: {
          title: { text: 'Tiempo'
          },
          labels: {
            format: '{value} ' + 'H:m'
          }
        },
        yAxis: {
          title: {
            text: 'Humedad'
          },
          labels: {
            formatter: function () {
              return this.value + ' C'
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y:,.0f} °C</b><br/> Hora: {point.x}'
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: 'Temperatura',
          data: []
        }]
      },
      FechaM: '',
      NombreM: '',
      LugarM: '',
      TipoM: '',
      UsuarioM: '',
      center: {},
      markers: [],
      interval: {},
      value: 0,
      dialog: false,
      items: [],
      search: '',
      // aqui comienza tabla
      headers: [
        {
          text: 'Id Me',
          align: 'left',
          sortable: true,
          value: 'Id'
        },
          { text: 'Hora', value: 'Hora' },
          { text: 'Polucion(Concentracion)', align: 'center', value: 'Polucion' },
          { text: 'Humedad', value: 'Humedad' },
          { text: 'Temperatura', value: 'Temperatura' },
            { text: 'Gas', value: 'Gas' },
          { text: 'Actions', value: 'name', sortable: false }
      ]
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.cargarElementos()
  },
  methods: {
    cargarElementos () {
      var key = this.$route.params.id
      var center = {}
      var datos2 = []
      var datosMuestra = []
      var datosTemperatura = []
      var datosGas = []
      var datosHumedad = []
      var datosPolucion = []
      var arrayaux = []
      var medicion = ''
      var nombre = ''
      var lugar = ''
      var fecha = ''
      var usuario = ''
      var tipo = ''
      var item = firebase.database().ref('Mediciones/' + key)
      item.on('value', function (snapshot) {
        datos2.length = 0
        datosMuestra.length = 0
        datosHumedad.length = 0
        datosGas.length = 0
        datosPolucion.length = 0
        arrayaux.length = 0
        datosTemperatura.length = 0
        center = {}
        medicion = snapshot.val()
        lugar = medicion.Lugar
        fecha = medicion.Fecha
        usuario = medicion.Usuario
        tipo = medicion.Tipo
        var lat = Number(medicion.Gps.lat)
        var lng = Number(medicion.Gps.lng)
        datos2.push({
          position: {lat: lat, lng: lng},
          type: 'info'
        })
        center = {lat: lat,
          lng: lng}
        for (var key in medicion.Muestras) {
          var id = key
          var hora = medicion.Muestras[key].Hora
          var polucion = medicion.Muestras[key].Polucion
          var temperatura = medicion.Muestras[key].Temperatura
          var humedad = medicion.Muestras[key].Humedad
          var gas = medicion.Muestras[key].Gas
          datosMuestra.push({
            Id: id,
            Hora: hora,
            Polucion: polucion,
            Temperatura: temperatura,
            Humedad: humedad,
            Gas: gas
          })
          arrayaux = [Number(hora), Number(humedad)]
          datosHumedad.push(arrayaux)
          arrayaux = [Number(hora), Number(gas)]
          datosGas.push(arrayaux)
          arrayaux = [Number(hora), Number(polucion)]
          datosPolucion.push(arrayaux)
          arrayaux = [Number(hora), Number(temperatura)]
          datosTemperatura.push(arrayaux)
        }
      })
      this.items = datosMuestra
      this.FechaM = fecha
      this.NombreM = nombre
      this.LugarM = lugar
      this.FechaM = fecha
      this.UsuarioM = usuario
      this.TipoM = tipo
      this.center = center
      this.markers = datos2
      this.Humedad.series[0].data = datosHumedad
      this.Gas.series[0].data = datosGas
      this.Polucion.series[0].data = datosPolucion
      this.Temperatura.series[0].data = datosTemperatura
    },
    AddMuestra () {
      this.dialog = true
      var key = this.$route.params.id
      this.interval = setInterval(() => {
        if (this.value === 100) {
          this.guardarMuestra(key)
          this.dialog = false
          clearInterval(this.interval)
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    }
  }
}
</script>
<style>
.add {
  color: #fff !important;
}
</style>
