// Assemble modules and export the store

import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import page from './modules/page'
import auth from './modules/auth'
import media from './modules/media'
import book from './modules/book'

import createLogger from '../plugins/logger'

Vue.use(Vuex);  

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    // actions,
    // getters,
    modules: {
      common,
      auth,
      page,
      media,
      book,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
  