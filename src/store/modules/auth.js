import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { ApiHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { storeUserToken, destroyUserToken, hasValidUser, getUser } from '@/shared/auth-service'
import { REGISTER, DEBUG } from '@/env/index'

const state = {
  authUser: null,
  loadingBar: false,
  authenticated: false,
  userData: {}
}

const getters = {
  loadingBar: state => state.loadingBar,
  authenticated: state => state.authenticated,
  userData: state => state.userData
}

const mutations = {
  authUser (state, {username, token}) {
    state.authUser = {
      username: username,
      token: token
    }
  },
  loadingBar (state, status) {
    state.loadingBar = status
    // if (status) {
    //   Loading.show({delay:0})
    // } else {
    //   Loading.hide({delay:0})
    // }
  },
  setAuthenticated (state, status) {
    state.authenticated = status
    if (status) {
      state.userData = getUser()
    }
    else {
      state.userData = {}
    }
  },
  refreshUser (state) {
    state.userData = getUser()
  }
}

const actions = {
  authenticate ({ commit }, payload) {
    commit('COMMOM_UPDATE_FULLSCREEN_LOADER', true) //Common Loader Module
    const { username, password } = payload.auth
    const credentials = {}
    // const selectedLang = localStorage.getItem('default_lang')
    ApiHttp.post(`/login?username=${username}&password=${password}`)
      .then((response) => {
        credentials.token = response.data.token
        credentials._id = response.data._id
        return ApiHttp.get(`/user/${credentials._id}`, {
          headers: {
            'token': credentials.token
          }
        })
      }).then((response) => {
        credentials.username = `${response.data.first_name} ${response.data.last_name}`
        credentials.email = response.data.email
        credentials.avatar = response.data.profile_image
        storeUserToken(credentials)
        commit('refreshUser')
        commit('setAuthenticated', true)
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER', false) //Common Loader Module 
        payload.router.push('/')
        Vue.toasted.success("Login Successfully").goAway(3000);
      
      })
      .catch((error) => {
        var message = ''

        if (error.response) {
          let data = error.response.data
          if (data.errors[0].ERR_CODE === 'E109') {
            message =data.errors[0].ERR_MSG;            
          }
        }

        commit('COMMOM_UPDATE_FULLSCREEN_LOADER', false) //Common Loader Module
        Vue.toasted.error(message).goAway(3000);
      })
  },
  authLogout ({ commit }, payload) {
    destroyUserToken()
    commit('setAuthenticated', false)
    payload.push('/login')
  },
  authUserDetect ({ commit }) {
    if (hasValidUser()) {
      commit('setAuthenticated', true)
    }
  },
  loadingBar ({ commit }, payload) {
    commit('loadingBar', payload)
  },
  setAuthenticated ({ commit }, payload) {
    commit('setAuthenticated', payload)
  },
  removeUserToken ({ commit, dispatch }, router) {
    commit('setAuthenticated', false)
    dispatch('showToash', { message: 'Session expired', type: 'error' })
    destroyUserToken()

    if (router) {
      router.push('/login')
    }
  },
  handleErrorResponse ({ commit, dispatch }, payload) {
    const SHOW_TOASH = 'showToash'
    if (payload.errors.response && payload.errors.response.status !== 500) {
      let response = payload.errors.response.data.error || payload.errors.response.data.errors
      let errorTypes = ['TOKEN_EXPIRATION_ERROR', 'INVALID_TOKEN_ERROR']
      if (response && indexOf(errorTypes, response.ERROR_CODE) !== -1) {
        dispatch('removeUserToken', payload.router)
      }
      else if (Array.isArray(response)) {
        each(response, (val, key) => {
          if (val instanceof Object) {
            dispatch(SHOW_TOASH, { type: 'error', message: val.ERR_MSG })
          }
        })
      }
      else {
        dispatch(SHOW_TOASH, { message: response.ERROR_DESCRIPTION, type: 'error' })
      }
    }
    else {
      let errorMessage

      if (DEBUG) {
        errorMessage = payload.errors
      }
      else {
        errorMessage = Vue.$t('http.errors.internal_server_orror')
      }

      dispatch(SHOW_TOASH, { message: errorMessage, type: 'error' })
    }
  },
  registerNewUser ({ commit }, payload) {
    commit('loadingBar', true)
    return ApiHttp.post(REGISTER() + toQueryParams(payload.queryString), payload.formData)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
