<template>
  <gmap-map ref="mapa"
:center="center"
:zoom="13"
style="width: 100%; height: 500px; padding-top:0px;">
<gmap-marker
:key="index"
v-for="(m, index) in markers"
:position="m.position"
:clickable="true"
></gmap-marker>
</gmap-map>


</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import {mixin} from '../mixins'
import firebase from 'firebase'

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
      modal: false,
      modal2: false,
      center: {lat: 8.7511803, lng: -75.8784618},
      markers: []
    }
  },
  mounted () {
    this.cargarUbicaciones()
    let map = this.$refs.mapa
    console.log(map)
  },
  methods: {
    cargarUbicaciones () {
      var datos = ''
      var datos2 = []
      var mediciones = firebase.database().ref('Mediciones/')
      mediciones.on('value', function (snapshot) {
        datos2.length = 0
        datos = snapshot.val()
        for (var key in datos) {
          var lat = Number(datos[key].Gps.lat)
          var lng = Number(datos[key].Gps.lng)
          datos2.push({
            position: {lat: +lat, lng: +lng},
            type: 'info'
          })
        }
      })
      this.markers = datos2
    }
  }
}
</script>

<style>
    #map {
      height: 100%;
      width: 100%;

    }

</style>
