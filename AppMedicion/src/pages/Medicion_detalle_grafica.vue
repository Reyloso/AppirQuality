<template>
  <v-container  grid-list-xl>
    <v-layout>
      <v-flex xs12 sm12 d-inline-block>
        <v-btn color="primary" @click="back()" class="mb-2 add2 button-add-new"><v-icon class="iconacount2">add</v-icon> Atras</v-btn>
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
  </v-container>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highstock'

Vue.use(VueHighcharts, { Highcharts })

export default {
  data () {
    return {
      Temperatura: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Grafica de Medicion De Temperatura'
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
            text: 'Temperatura'
          },
          labels: {
            formatter: function () {
              return this.value + '°'
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} producida <b>{point.y:,.0f} °C </b><br/> Hora: {point.x}'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: [{
          name: 'Temperatura',
          data: [[0, 0]]
        }]
      }, // aqui termina
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
          pointFormat: '{series.name} producida <b>{point.y:,.0f} %</b><br/> Hora: {point.x}'
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
          data: [[0, 0]]
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
          pointFormat: '{series.name} producido <b>{point.y:,.0f} PPM</b><br/> Hora: {point.x}'
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
          data: [[0, 0]]
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
          pointFormat: '{series.name} producida <b>{point.y:,.0f} Concentracion en Mg/m3</b><br/> Hora: {point.x}'
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
          name: 'Polucion - Concentracion',
          data: [[0, 0]]
        }]
      }
    }
  },
  mounted () {
    this.cargarElementos()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    cargarElementos () {
      var key = this.$route.params.Id
      var datosTemperatura = []
      var datosGas = []
      var datosHumedad = []
      var datosPolucion = []
      var arrayaux = []
      var medicion = ''
      var fecha = ''
      var item = firebase.database().ref('Mediciones/' + key)
      item.on('value', function (snapshot) {
        datosTemperatura.length = 0
        datosHumedad.length = 0
        datosGas.length = 0
        datosPolucion.length = 0
        arrayaux.length = 0
        medicion = snapshot.val()
        for (var key in medicion.Muestras) {
          var hora = medicion.Muestras[key].Hora
          var polucion = medicion.Muestras[key].Polucion
          var temperatura = medicion.Muestras[key].Temperatura
          var humedad = medicion.Muestras[key].Humedad
          var gas = medicion.Muestras[key].Gas
          arrayaux = [Number(hora), Number(temperatura)]
          datosTemperatura.push(arrayaux)
          arrayaux = [Number(hora), Number(humedad)]
          datosHumedad.push(arrayaux)
          arrayaux = [Number(hora), Number(gas)]
          datosGas.push(arrayaux)
          arrayaux = [Number(hora), Number(polucion)]
          datosPolucion.push(arrayaux)
        }
      })
      this.FechaM = fecha
      this.Temperatura.series[0].data = datosTemperatura
      this.Humedad.series[0].data = datosHumedad
      this.Gas.series[0].data = datosGas
      this.Polucion.series[0].data = datosPolucion
    }
  }
}
</script>
<style>
.add2 {
  color: #fff !important;
}
.iconacount2 {
  color: #fff !important;
  padding-right: 5px !important;
}
</style>
