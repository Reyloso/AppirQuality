<template >

  <div class="v-container">
    <highcharts :options="options" ref="highcharts"></highcharts>
    <highcharts :options="options" ref="highcharts"></highcharts>

  </div>

</template>

<script>

import Vue from 'vue'
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highstock'
import {mixin} from '../mixins'

Vue.use(VueHighcharts, { Highcharts })

export default {
  mixins: [mixin],
  data () {
    return {
      options: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Grafica De Medicion De Temperatura'
        },
        subtitle: {
          text: 'Medicion de calidad del aire'
        },
        xAxis: {
          title: { text: 'Tiempo'
          },
          labels: {
            format: '{value}' + ':00 H'
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
          crosshairs: true,
          shared: true,
          valueDecimals: 2
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 2,
              lineColor: '#fff',
              lineWidth: 2
            }
          }
        },
        series: [{name: 'Humedad',
          marker: {
            symbol: 'square'
          },
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
            y: 26.5

          }, 23.3, 18.3, 13.9, 9.6]
        }, {
          name: 'Temperatura',
          marker: {
            symbol: 'diamond'
          },
          data: [{
            y: 3.9

          }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
      }
    }
  }
}
  </script>
