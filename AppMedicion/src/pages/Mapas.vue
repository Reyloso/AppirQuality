<template>
  <gmap-map
:center="center"
:zoom="14"
style="width: 100%; height: 640px; padding-top:0px;">
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

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA2bAdTNf2ro3yHQyUWDZBKI_1DHDjk9jg',
    v: '1.0'
  }
})
export default {
  mixins: [mixin],
  data () {
    return {
      modal: false,
      modal2: false,
      center: {lat: 8.7455749, lng: -75.8800797},
      markers: [{
        position: {lat: 8.7455749, lng: -75.8800797}
      },
      {
        position: {lat: 8.7455779, lng: -75.8870797}
      },
      {
        position: {lat: 8.7557779, lng: -75.8878787}
      }]
    }
  },
  mounted () {
  }
}
</script>

<style>
    #map {
      height: 100%;
      width: 100%;

    }

</style>
