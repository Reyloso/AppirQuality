<template>
  <v-container  grid-list-xl>

    <v-layout>
      <v-flex xs12 sm12 d-inline-block>
        <v-btn color="primary" @click="Modaladd()" class="mb-2 add2 button-add-new"><v-icon class="iconacount2">add</v-icon> Agregar Medicion</v-btn>
    </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm12 d-inline-block>
        <v-card>
          <v-card-title>
            <h4>Mediciones</h4>
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
           <router-link :to="'/detalle/medicion/' + props.item.Id" > <td>{{ props.item.Nombre }}</td> </router-link>
           <td class="text-xs-right">{{ props.item.Fecha }}</td>
           <td class="text-xs-right">{{ props.item.Usuario }}</td>
           <td class="text-xs-right">{{ props.item.Lugar }}</td>
           <td class="text-xs-right">{{ props.item.Tipo }}</td>
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
  <div>
    <v-dialog v-model="modaledit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Nombre" v-model="editedItem.Nombre"></v-text-field>
                <v-text-field label="Lugar" v-model="editedItem.Lugar"></v-text-field>
                <v-select label="Tipo"  v-model="editedItem.Tipo" :items="ite" required >
                </v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="actualizar()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-dialog v-model="modaladd2" persistent max-width="500px">
       <v-card>
         <v-card-title>
           <span class="headline">Nueva Medición</span>
         </v-card-title>
         <v-card-text>
           <v-container grid-list-md>
             <v-layout wrap>
             <v-flex xs12 sm12 md12>
               <v-text-field label="Nombre" v-model="Nombre"></v-text-field>
               <v-text-field label="Lugar" v-model="Lugar"></v-text-field>
               <v-select label="Tipo"  v-model="Tipo" :items="ite" required >
               </v-select>
             </v-flex>
             </v-layout>
           </v-container>

         </v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="blue darken-1"  @click="Modaladd()" >Cerrar</v-btn>
           <v-btn color="blue darken-1"  @click.native="submit()">Guardar</v-btn>
         </v-card-actions>
       </v-card>
  </v-dialog>
    </v-container>
  </template>
  <style>
  .a {
    text-decoration: none !important;
  }
  .button-add-new{
    background-color: #21ccad !important;
  }
  .button-edit{
    color: #21ccad !important;
  }
  .button-delete {
    color: #f00 !important;
  }

  .table__overflow {
      width: 100%;
      overflow-y: hidden;
      overflow-x: hidden;
  }
  .add2 {
    color: #fff !important;
  }
  .iconacount2 {
    color: #fff !important;
    padding-right: 5px !important;
  }

  </style>
<script>
import {mixin} from '../mixins'
import firebase from 'firebase'

export default {
  mixins: [mixin],
  data () {
    return {
      search: '',
      modaledit: false,
      Lugar: '',
      modaladd2: false,
      Tipo: '',
      Nombre: '',
      ite: [
        'Estatica',
        'Dinamica'
      ],
      headers: [
        {
          text: 'Nombre Medicion',
          align: 'left',
          sortable: true,
          value: 'Nombre'
        },
          { text: 'Fecha', value: 'Fecha' },
          { text: 'Usuario', align: 'center', value: 'Usuario' },
          { text: 'Lugar', value: 'Lugar' },
          { text: 'Tipo', value: 'Tipo' },
          { text: 'Actions', value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        Nombre: '',
        Tipo: '',
        Lugar: ''
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },
  computed: {
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created: function () {
  },
  methods: {
    submit () {
      if (this.Lugar !== '' && this.Nombre !== '' && this.Tipo !== null) {
        this.guardarfirebase(this.Lugar, this.Nombre, this.Tipo)
        this.Tipo = null
        this.Lugar = ''
        this.Nombre = ''
        this.modaladd = false
      } else {
      }
    },
    Modaladd () {
      if (this.modaladd === false) {
        this.modaladd = true
      } else {
        this.modaladd = false
      }
    },
    listar () {
      var datos = ''
      var datos2 = []
      var mediciones = firebase.database().ref('Mediciones/')
      mediciones.on('value', function (snapshot) {
        datos2.length = 0
        datos = snapshot.val()
        for (var key in datos) {
          var Id = key
          var nombre = datos[key].Nombre
          var fecha = datos[key].Fecha
          var usuario = datos[key].Usuario
          var lugar = datos[key].Lugar
          var tipo = datos[key].Tipo
          var gps = datos[key].Gps
          datos2.push({
            Id: Id,
            Nombre: nombre,
            Fecha: fecha,
            Usuario: usuario,
            Lugar: lugar,
            Tipo: tipo,
            Gps: gps
          })
        }
      })
      this.items = datos2
    },
    actualizar () {
      var key = this.editedItem.Id
      firebase.database().ref('Mediciones/' + key).update({
        Nombre: this.editedItem.Nombre,
        Tipo: this.editedItem.Tipo,
        Gps: this.editedItem.Gps,
        Lugar: this.editedItem.Lugar,
        Fecha: this.editedItem.Fecha,
        Usuario: this.editedItem.Usuario
      })
      this.modaledit = false
    },
    editItem (item) {
      this.editedItem = {
        Id: item.Id,
        Nombre: item.Nombre,
        Fecha: item.Fecha,
        Usuario: item.Usuario,
        Lugar: item.Lugar,
        Tipo: item.Tipo,
        Gps: item.Gps
      }
      this.modaledit = true
    },
    deleteItem (item) {
      var itemBorrar = firebase.database().ref('Mediciones/' + item.Id)
      itemBorrar.remove()
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  },
  mounted () {
    this.listar()
  }
}
</script>
