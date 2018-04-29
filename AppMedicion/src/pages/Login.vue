<template lang="pug">
div
  v-dialog(hover='',:value='true', persistent='')
        v-card-title
              <v-avatar> <img src="/static/logo.png" alt="John"></v-avatar>

        form(v-model="valid")
            v-text-field(
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required)
            v-text-field(
              name="input-10-1"
              label="Contraseña"
              hint="Minimo 8 caracteres"
              v-model="password"
              min="6"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              required)
        <div class="btn-gmail">
            <v-btn class="entrar" dark large @click="login"><i class="material-icons icon">input</i> Iniciar Sesion  </v-btn>
        </div>
        <div class="btn-gmail">
            <v-btn color="error" dark large><i class="material-icons icon">gmail</i> Iniciar Con Google</v-btn>
        </div>

</template>

<script>
import firebase from 'firebase'
import {mixin} from '../mixins'

export default {
  mixins: [mixin],
  data () {
    return {
      e1: true,
      valid: false,
      model: {
        email: '',
        password: ''
      },
      show: false
    }
  },
  created: function () {
    this.autenticacion()
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      }).then(function () {
        this.autenticacion()
      })
    }
  },
  mounted () {
  }
}
</script>

<style>
  body{
    background-image: url('/static/endesa_ciudades.jpg');
    background-size: cover;
  }
  .icon {
    margin-right: 7px;
  }

  .dialog  {
    background-color: #fff;
    height: 65%;
  }

  form {
    padding-left: 30px;
    padding-right: 30px;
  }

  .layout .flex.xs12 {
    flex-basis: 100%;
    max-width: 100%;
    align-self: center;
  }

  .btn--large {
    margin: 15px 0;
    width: 100%;
    position: relative;
    background-color: #db4437;
    color: white;
  }

  .btn-gmail {
    margin-right: 15px;
    margin-left: 15px

  }
  .entrar {
    margin-right: 15px;
    background-color: #009688;

  }

  .layout .flex.xs12 {
    align-items: center;
    font-size: 14px;
    }

  .avatar{
      margin-top: 40px;

    }

  .pt-1{
    align-items: center;
    display: initial;

  }


  .card__title {
    align-items: center;
    display: initial;
    margin-top: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 0px;
    padding-left: 0px;
  }
</style>
