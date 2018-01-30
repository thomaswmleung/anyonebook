// Assemble modules and export the store

import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import page from './modules/page'
import auth from './modules/auth'
import media from './modules/media'
import book from './modules/book'
import order from './modules/order'
import user from './modules/user'

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
      order,
      user
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
