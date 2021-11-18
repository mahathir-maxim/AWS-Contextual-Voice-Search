<template>
  <div id="app">
    <Dropdown title="Select Company"/>
    <Dropdown title="Select Atrribute"/>
    <SearchButton/>
  </div>
</template>

<script>
import Dropdown from './components/Dropdown.vue'
import SearchButton from './components/SearchButton.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    c_name: "AMZN",
    c_attrb: "Assets"
  },
  mutations: {
  assign_name (state, n) {
    state.c_name = n
  }
}
})

export default {
  name: 'App',
  components: {
    Dropdown,
    SearchButton
  },
  store: store
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
