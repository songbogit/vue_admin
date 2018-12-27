import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import page from './module/page_template'
import material from './module/material'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    page,
    material
  }
})
