// Assemble modules and export the store

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import order from './modules/order'
import user from './modules/user'
import pagination from './modules/pagination'