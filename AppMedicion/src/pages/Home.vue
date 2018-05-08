<template >

  <div class="v-container">
    <highcharts :options='options' ref="highcharts"></highcharts>
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
            format: '{value}' + 'H'
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
          valueDecimals: 0
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
        series: [{
          name: 'Temperatura',
          marker: {
            symbol: 'diamond'
          },
          data: [[8, 25]]
        }]
      }
    }
  },
  mounted () {
    console.log('hola')
  }
}
  </script>

  <style>
  .create {
    position: absolute;
  }
  .create .btn--floating {
    position: relative;
  }

  </style>
