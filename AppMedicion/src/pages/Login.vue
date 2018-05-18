<template lang="pug">
div
  v-dialog(hover='',:value='true', persistent='')
        v-card-title
              <v-avatar> <img src="/static/logo.png" alt="John"></v-avatar>

        form(v-model="valid" v-show="ver")
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
            <a @click="verlogin()"> olvido su contraseña?</a>
        <div class="btn-gmail" v-show="ver">
            <v-btn class="entrar" dark large @click="login()"><i class="material-icons icon">input</i> Iniciar Sesion  </v-btn>
        </div>
        <div class="btn-gmail" v-show="ver">
            <v-btn color="error" dark large @click="loginWithGoogle()"><i class="material-icons icon">gmail</i> Iniciar Con Google</v-btn>
        </div>

        form(v-model="valid" v-show="restore")
            v-text-field(
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required)

        <div class="btn-gmail" v-show="restore">
            <v-btn class="entrar" dark large @click="restorePass()"> Restaurar  </v-btn>
        </div>
        <div class="btn-gmail" v-show="restore">
            <v-btn color="error" dark large @click="verlogin()"> Volver a Iniciar Sesion</v-btn>
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
      ver: true,
      valid: false,
      restore: false,
      model: {
        email: '',
        password: ''
      },
      show: false
    }
  },
  created: function () {
  },
  methods: {
    verlogin () {
      if (this.restore === false) {
        this.restore = true
        this.ver = false
      } else {
        this.restore = false
        this.ver = true
      }
    },
    restorePass () {
      firebase.auth().sendPasswordResetEmail(this.email).then(function () {
      }).catch(function (error) {
        console.log(error)
      })
      this.email = ''
    },
    loginWithGoogle () {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // var token = result.credential.accessToken
        // The signed-in user info.
        this.$router.push({ path: `/` })
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        console.log(errorCode)
        var errorMessage = error.message
        console.log(errorMessage)
        // The email of the user's account used.
        var email = error.email
        console.log(email)
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        console.log(credential)
        // ...
      })
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      }).then(function () {
        this.$router.push({ path: `/` })
      })
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.$router.push({ path: `/` })
      }
    })
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
  @media only screen and (max-width: 3080px){
    .dialog {
      width: 411px;
      height: 35%;
    }
  }

  @media only screen and (max-width: 2080px){
    .dialog {
      width: 411px;
      height: 60%;
    }
  }
  @media only screen and (max-width: 1406px){
    .dialog {
      width: 411px;
      height: 65%;
    }
  }

  @media only screen and (max-width: 1366px){
    .dialog {
      width: 411px;
      height: 80%;
    }
  }

  @media only screen and (max-width: 768px){
    .dialog {
      width: 411px;
      height: 45%;
    }
  }


  @media only screen and (max-width: 414px){
    .dialog {
      width: 411px;
      height: 60%;
    }
  }

  @media only screen and (max-width: 375px){
    .dialog {
      width: 317px;
      height: 65%;
    }
  }

  @media only screen and (max-width: 360px){
    .dialog {
      width: 317px;
      height: 70%;
    }
  }

  @media only screen and (max-width: 320px){
      .dialog {
        width: 317px;
        height: 80%;
      }
  }

</style>
