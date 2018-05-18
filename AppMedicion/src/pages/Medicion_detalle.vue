<template>
  <v-container  grid-list-xl>
    <v-layout>
      <v-flex xs12 sm12 d-inline-block>
        <v-btn color="primary" @click="AddMuestra()" class="mb-2 add2 button-add-new"><v-icon class="iconacount2">add</v-icon> Agregar Muestra</v-btn>
        <v-btn color="primary" @click="detailgraphic()" class="mb-2 add2 button-add-new"><v-icon class="iconacount2">insert_chart</v-icon> Ver Graficas</v-btn>
    </v-flex>
    </v-layout>
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
            <h5>{{NombreM}}</h5>
            <p><b>Lugar:</b> {{LugarM}}</p>
            <p><b>Fecha de creacion:</b> {{FechaM}}</p>
            <p><b>Tipo Medicion:</b> {{TipoM}}</p>
            <p><b>Usuario:</b> {{UsuarioM}}</p>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>

  <v-layout>
    <v-flex xs12 sm12 d-inline-block>
      <v-card>
        <v-card-title>
          <h5>Muestras</h5>
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
         <td class="text-xs-right">{{ props.item.Hora }}</td>
         <td class="text-xs-right">{{ props.item.Polucion }}</td>
         <td class="text-xs-right">{{ props.item.Humedad }}</td>
         <td class="text-xs-right">{{ props.item.Temperatura }}</td>
         <td class="text-xs-right">{{ props.item.Gas }}</td>
         <td class="justify-center layout px-0">
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
      //  {
      //    text: 'Id Me',
      //    align: 'left',
      //    sortable: true,
      //    value: 'Id'
      //  },
          { text: 'Hora', value: 'Hora' },
          { text: 'Polucion(Concentracion)', align: 'center', value: 'Polucion' },
          { text: 'Humedad(%)', value: 'Humedad' },
          { text: 'Temperatura(°C)', value: 'Temperatura' },
            { text: 'Gas(PPM)', value: 'Gas' },
          { text: 'Eliminar', value: 'name', sortable: false }
      ]
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.conectarParticle()
    this.cargarElementos()
  },
  methods: {
    detailgraphic () {
      var key = this.$route.params.Id
      this.$router.push({name: 'detalle_grafica', params: { Id: key }})
    },
    deleteItem (item) {
      var key = this.$route.params.Id
      console.log(key)
      var itemBorrar = firebase.database().ref('Mediciones/' + key + '/Muestras/' + item.Id)
      itemBorrar.remove()
    },
    cargarElementos () {
      var key = this.$route.params.Id
      var center = {}
      var datos2 = []
      var datosMuestra = []
      var medicion = ''
      var nombre = ''
      var lugar = ''
      var fecha = ''
      var usuario = ''
      var tipo = ''
      var item = firebase.database().ref('Mediciones/' + key)
      console.log(key)
      item.on('value', function (snapshot) {
        datos2.length = 0
        datosMuestra.length = 0
        center = {}
        medicion = snapshot.val()
        console.log(medicion.Lugar)
        lugar = medicion.Lugar
        fecha = medicion.Fecha
        usuario = medicion.Usuario
        nombre = medicion.Nombre
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
          var Id = key
          var hora = medicion.Muestras[key].Hora
          var polucion = medicion.Muestras[key].Polucion
          var temperatura = medicion.Muestras[key].Temperatura
          var humedad = medicion.Muestras[key].Humedad
          var gas = medicion.Muestras[key].Gas
          datosMuestra.push({
            Id: Id,
            Hora: hora,
            Polucion: polucion,
            Temperatura: temperatura,
            Humedad: humedad,
            Gas: gas
          })
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
    },
    AddMuestra () {
      this.conectarParticle()
      this.dialog = true
      var key = this.$route.params.Id
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

.add2 {
  color: #fff !important;
}
.iconacount2 {
  color: #fff !important;
  padding-right: 5px !important;
}
</style>
