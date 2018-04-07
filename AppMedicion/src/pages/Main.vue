<template lang="pug">
v-app(standalone)
  v-navigation-drawer(style="backgroud-color:#000;" v-model='drawer',:mini-variant.sync="mini", persistent,enable-resize-watcher)
    .pa-3.text-xs-center(v-show="!mini")
      div.display-2.py-4 AppirQuality
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

          v-list-tile(v-for='subItem in item.items', :key='subItem.href',:to='subItem.href', v-bind:router='!subItem.target', ripple, v-bind:disabled='subItem.disabled', v-bind:target='subItem.target')
            v-list-tile-action(v-if='subItem.icon')
              v-icon.success--text {{ subItem.icon }}
            v-list-tile-content
              v-list-tile-title {{ $t(subItem.title) }}
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

      <v-btn fab small >
        <small>usename</small>
        <img class="avatars" src="/static/rey.jpg" alt="John">
        <small></small>
      </v-btn>

      v-avatar

  main
    v-container.pa-4(fluid)
        v-alert(v-bind='message', v-model='message.body', dismissible) {{message.body}}
        .py-2
          v-slide-y-transition(mode='out-in')
            router-view
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      theme: 'primary',
      mini: true,
      drawer: true,
      locales: ['en-US']
    }
  },
  computed: {
    ...mapState(['message', 'menu', 'pageTitle'])
  },
  methods: {
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
    fetchMenu () {
      // fetch menu from server
      // this.$http.get('menu').then(({data}) => this.$store.commit('setMenu', data))
    }
  },

  created () {
    this.fetchMenu()
  }
}
</script>

<style>
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
    color: #fff;
}
  .avatar img {
      height: 50px;
      width: 50px;
      border-radius: 87%;
    }
  .pa-3 img {
        height: 50px;
        width: 50px;
        border-radius: 87%;
    }
  .avatars {
      height: 40px;
      width: 40px;
      border-radius: 87%;
    }

    .list--dense .list__tile .icon {
    font-size: 21px;
    color: #fff;
  }

</style>
