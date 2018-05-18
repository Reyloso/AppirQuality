<template lang="pug">
v-app(standalone)
  v-navigation-drawer(style="backgroud-color:#000;" v-model='drawer',:mini-variant.sync="mini", persistent,enable-resize-watcher)
    .pa-3.text-xs-center(v-show="!mini")
      <img class="mainlogo" src="/static/logo.png" alt="John">

    .pa-3.text-xs-center(v-show="mini")
      .display-2 <v-avatar> <img src="/static/logo.png" alt="John"></v-avatar>
    v-divider
    v-list(dense)
      template(v-for='item in menu')
        v-list-group(v-if='item.items', v-bind:group='item.group')
          v-list-tile(:to='item.href', slot='item', :title="item.title")
            v-list-tile-action
              v-icon() {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ $t(item.title) }}
            v-list-tile-action
              v-icon() keyboard_arrow_down

        v-subheader(v-else-if='item.header') {{ item.header }}
        v-divider(v-else-if='item.divider')
        v-list-tile(v-else,:to='item.href', router, ripple, v-bind:disabled='item.disabled', :title="item.title")
          v-list-tile-action
            v-icon() {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ $t(item.title) }}
          v-list-tile-action(v-if='item.subAction')
            v-icon.success--text {{ item.subAction }}

  v-toolbar.darken-1(fixed,:class="theme" )
    v-toolbar-side-icon(v-on:click.prevent="changedrawer")
    v-toolbar-title {{$t(pageTitle)}}
    <v-spacer></v-spacer>
      v-spacer

      <h1 class="mensajeinicio">{{displayN}} </h1>
        <v-layout wrap justify-space-around align-center>
        </v-layout>
        <v-menu bottom left>
           <v-btn icon slot="activator" dark>
             <v-icon>more_vert</v-icon>
           </v-btn>
           <v-list class="lista-menu">
             <v-list-tile v-for="(item, i) in items" :key="i" @click="singOut()">
               <v-list-tile-title><v-icon class="iconacount2">fa-sign-out</v-icon>{{ item.title }}</v-list-tile-title>
             </v-list-tile>
           </v-list>
        </v-menu>
  main
    v-container.pa-4(fluid)
        v-alert(v-bind='message', v-model='message.body', dismissible) {{message.body}}
        .py-2
          v-slide-y-transition(mode='out-in')
            router-view
  <v-btn class="botonfloat btnspeedial" color="pink" @click="viewadd()" dark absolute top right fab>
      <v-icon class="iconacount">add</v-icon>
  </v-btn>
  <v-layout row justify-center>
        </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
          </v-list-tile>
                      </v-flex>
                      </v-list>
                      </v-card>
                      </v-dialog>

                      <v-dialog v-model="modaladd" persistent max-width="500px">
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
                               <v-btn color="blue darken-1" flat @click="viewadd()" >Cerrar</v-btn>
                               <v-btn color="blue darken-1" flat @click.native="submit()">Guardar</v-btn>
                             </v-card-actions>
                           </v-card>
                      </v-dialog>
  </v-layout>
</template>
<script>

import { mapState } from 'vuex'
import {mixin} from '../mixins'
import firebase from 'firebase'

export default {
  mixins: [mixin],
  data: () => ({
    displayN: '',
    theme: 'primary',
    mini: true,
    drawer: true,
    locales: ['es-co'],
    Lugar: '',
    Nombre: '',
    alert: false,
    alert2: false,
    dialog: false,
    select: null,
    interval: {},
    value: 0,
    modaladd: false,
    Tipo: '',
    ite: [
      'Estatica',
      'Dinamica'
    ],
    items: [
       { title: 'Salir' }
    ]
  }),
  computed: {
    ...mapState(['message', 'menu', 'pageTitle'])
  },
  methods: {
    viewadd () {
      if (this.modaladd === false) {
        this.modaladd = true
      } else {
        this.modaladd = false
      }
    },
    singOut () {
      firebase.auth().signOut().then(function () {
        console.log('ha saliddo correctamente')
        this.$router.push({ path: `/login` })
      }).catch(function (error) {
        var errorlog = error
        console.log(errorlog)
      })
    },
    changeLocale (to) {
      global.helper.ls.set('locale', to)
      this.$i18n.locale = to
    },
    changedrawer () {
      if (this.drawer === true && this.mini === true) {
        this.drawer = false
      } else if (this.drawer === true && this.mini === false) {
        this.mini = true
      } else {
        this.drawer = true
      }
    },
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
    clear () {
      this.lugar = ''
      this.Nombre = ''
      this.alert = false
      this.alert2 = false
      this.select = null
    }
  },
  created () {
  },
  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      if (user.displayName == null) {
        this.displayN = 'Bienvenido,  ' + user.email
      } else {
        this.displayN = 'Bienvenido,  ' + user.displayName
      }
    })
  }
}
</script>

<style>
.lista-menu{
    background-color: #21ccad !important;
}

.btnspeedial{
  background-color: #21ccad !important;
}

.botonfloat {
  position: fixed!important;
  top: 85%!important;
}

  .primary{
    background-color: #21ccad !important;
  }
  .toolbar__content {
    background-color: #21ccad;
  }
  .pa-3 {
      background-color: #666666;
      color: white;
    }

  .application--light .navigation-drawer {
      background-color: #666666;
      height: 104%;
  }

  .application--light .navigation-drawer .list {
    background: #666666;
    text-decoration-color: #fff;
  }
  .application--light .list .subheader {
    color: #fff;
  }

  .list__tile__title {
    color: #fff!important;
  }
  .pa-3 img {
        height: 50%;
        width: 50%;
        border-radius: 87%;
    }

    .list--dense .list__tile .icon {
    font-size: 21px;
    color: #fff;
  }


  .btn--icon .btn__content {
    color: #fff;
  }
  .toolbar__title {
    color: #fff;
  }

  speed-dial__list {
    background-color: #666666 !important;
  }

  .titulo {
    margin-left: 2%;
  }

  .iconacount2{
    color: #fff !important;
    font-size: 20px;
  }

  @media only screen and (max-width: 1200px){
    .mensajeinicio {
      color: #ffffff !important;
      font-size: 15px !important;
      margin-right: 10px !important;
      margin-top: 15px;
    }
    .dialog--fullscreen {
      width: 100% !important;
      height: 100% !important;
    }
    .iconacount {
      margin-left: 7px;
    }
  }

  @media only screen and (min-width: 1200px) {
    .mensajeinicio {
      color: #ffffff !important;
      font-size: 15px !important;
      margin-right: 10px !important;
      margin-top: 15px;
    }
  }

  @media only screen and (max-width: 600px){
    h1 {
       font-size: 11.2px;
    }
    .iconacount {
      margin-left: 7px;
    }
  }

  @media only screen and (min-width: 600px){
    h1 {
       font-size: 11.2px;
    }

  }

  @media only screen and (max-width: 414px){
    .iconacount {
      margin-left: 0px;
    }
  }


</style>
