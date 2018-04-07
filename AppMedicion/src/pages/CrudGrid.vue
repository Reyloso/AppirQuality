<template >
      <v-card>
        <v-card-title primary-title>
          <h4>Añadir Medicion</h4>
        </v-card-title>
         <v-divider ></v-divider>
         <v-flex xs8 sm6 offset-sm3>
           <form>
     <v-text-field
       label="Lugar"
       v-model="lugar"
     ></v-text-field>

     <v-btn@click="submit">Guardar </v-btn>
     <v-btn @click="clear">Limpiar</v-btn>
   </form>
   <v-alert class="guardar" type="success" dismissible v-model="alert">
     La nueva medición ha sido guardada correctamente!
    </v-alert>
    <v-alert class="error" type="success" dismissible v-model="alert2">
      Error al guardar la medicion verifique los campos e intente nuevamente..!!
     </v-alert>
 </v-flex>
      </v-card>
</template>
<script>
import {mixin} from '../mixins'

export default {
  mixins: [mixin],
  data: () => ({
    lugar: '',
    alert: false,
    alert2: false
  }),
  computed: {
  },
  methods: {
    eventos () {

    },
    submit () {
      if (this.lugar !== '') {
        console.log(this.lugar)
        this.guardarfirebase(this.lugar)
        this.lugar = ''
        this.alert2 = false
        this.alert = true
      } else {
        this.alert = false
        this.alert2 = true
      }
    },
    clear () {
      this.lugar = ''
    }
  }
}
</script>
<style>
    .guardar {
      background-color: #4caf50;
    }
</style>
