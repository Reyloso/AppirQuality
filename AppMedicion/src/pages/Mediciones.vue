<template>
  <v-card>
    <v-card-title>
      <h4>Mediciones</h4>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card></template>
<script>
import ws from 'adonis-websocket-client'
import {mixin} from '../mixins'
const io = ws(global.config.url, {})
const client = io.channel('chat')

export default {
  mixins: [mixin],
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Ubicacion',
          align: 'center',
          sortable: true,
          value: 'name'
        },
          { text: 'Fecha', value: 'calories' },
          { text: 'Usuario', value: 'fat' },
          { text: 'Gps', value: 'carbs' },
          { text: 'Humedad', value: 'protein' },
          { text: 'Temperatura', value: 'iron' }
      ],
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  methods: {
    send () {
      if (this.message.length < 1) {
        return false
      }
      client.emit('message', this.message)
      this.message = ''
    }
  },
  mounted () {
    client.connect((error, connected) => {
      if (error) {
        this.showWarning = true
        return false
        // do something
      }
      console.log('connected: ', connected)
      client.emit('message', 'hello')
      // all good
    })
    client.on('error', (message) => {
      console.log(message)
    })
    client.on('message', (message) => {
      this.list.push(message)
      if (this.list.length > this.maxLength) {
        this.list.shift()
      }
    })
  }
}
</script>
