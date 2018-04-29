<template >
      <v-card >
        <v-card-title primary-title class="titulo">
          <h4>Añadir Medicion</h4>
        </v-card-title>
         <v-flex xs8 sm6 offset-sm3
           <form class="registrar">
     <v-text-field
       label="Nombre de La Medicion"
       v-model="Nombre"
       required
     ></v-text-field>
     <v-text-field
       label="Lugar"
       v-model="lugar"
       required
     ></v-text-field>
     <v-select
      label="Tipo Medicion"
      v-model="select"
      :items="ite"
      required
    ></v-select>
     <v-btn @click="submit">Guardar </v-btn>
     <v-btn @click="clear">Limpiar</v-btn>
   </form>

   <v-alert class="guardar" type="success" dismissible v-model="alert">
     La nueva medición ha sido guardada correctamente!
    </v-alert>
    <v-alert class="error" type="success" dismissible v-model="alert2">
      Error al guardar la medicion verifique los campos e intente nuevamente..!!
     </v-alert>
 </v-flex>

        <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"><h6>Cargando...</h6></v-card-title>
        <v-progress-circular
      :size="100"
      :width="15"
      :rotate="360"
      :value="value"
      color="green">
      {{ value }}
    </v-progress-circular>

        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

  <v-data-table
      :headers="headers"
      :items="items"
      :loading="false"
      class="elevation-1"
      v-show="ver"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.Nombre }}</td>
        <td class="text-xs-right">{{ props.item.Lugar }}</td>
        <td class="text-xs-right">{{ props.item.Tipo }}</td>
        <td class="text-xs-right">{{ props.item.Ubicacion }}</td>
        <td class="text-xs-right">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-flex>

      </v-card>
</template>
<script>
import {mixin} from '../mixins'

export default {
  mixins: [mixin],
  data: () => ({
    pagination: {},
    headers: [
      {
        text: 'Nombre Medicion',
        align: 'left',
        sortable: true,
        value: 'Nombre'
      },
          { text: 'Lugar', value: 'Lugar' },
          { text: 'Tipo Medicion', value: 'Tipo' },
          { text: 'Usuario', value: 'Ubicacion' },
          { text: 'ver', value: 'Nombre' }
    ],
    items: [
      {
        Nombre: 'Medicion Dia Del Carro',
        Lugar: 'Monteria',
        Tipo: 'Fija',
        Ubicacion: 'Sol Hernandez',
        Gps: 88885588775544
      },
      {
        Nombre: 'Medicion Hora Pico',
        Lugar: 'Cerete',
        Tipo: 'Recorrido',
        Ubicacion: 'Reinaldo Lopez',
        Gps: 88886557778655
      }
    ],
    lugar: '',
    Nombre: '',
    alert: false,
    alert2: false,
    dialog: false,
    select: null,
    interval: {},
    value: 0,
    ver: true,
    ite: [
      'Estatica',
      'Dinamica'
    ]
  }),
  computed: {
  },
  methods: {
    eventos () {

    },
    submit () {
      if (this.lugar !== '' && this.Nombre !== '' && this.select !== null) {
        this.guardarfirebase(this.lugar, this.Nombre, this.select)
        this.alert2 = false
        this.dialog = true
        this.interval = setInterval(() => {
          if (this.value === 100) {
            this.select = null
            this.lugar = ''
            this.Nombre = ''
            this.alert = true
            this.dialog = false
            this.ver = true
            clearInterval(this.interval)
            this.items.push(this.medicion)
            return (this.value = 0)
          }
          this.value += 50
        }, 1000)
      } else {
        this.alert = false
        this.alert2 = true
      }
    },
    clear () {
      this.lugar = ''
      this.Nombre = ''
      this.alert = false
      this.alert2 = false
      this.select = null
    }
  }
}
</script>
<style>
 .guardar {
     background-color: #4caf50;
  }

  .registrar {
    padding-right: 5%;
    padding-left: 5%;
    padding-bottom: 2%;
  }

  .titulo {
    padding-left: 5%;
    padding-top: 5%;
  }
  .progress-circular{
    left: 31%;
    margin-bottom: 10%;
  }
  .list__tile__title {
    color: #000;
  }
</style>
