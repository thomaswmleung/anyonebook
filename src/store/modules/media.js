import { chunk } from 'lodash'
import moment from 'moment'
import { Http, ApiPrivateHttp } from '@/shared/http-service'
import { API_BASE_URL } from '@/env'

const MEDIA_TYPE = 'image'

const state = {
  allMedia: [],
  mediaPaginator: {
    currentPage: 1,
    totalRows: 0,
    perPage: 12,
    limit: 12
  },
  currentMedia: {}
}

const getters = {
  allMedia: state => state.allMedia,
  mediaDivide: state => chunk(state.media, 4),
  mediaPaginator: state => state.mediaPaginator,
  currentMedia: state => state.currentMedia
}

const mutations = {
  storeToStateMedia (state, media) {
    state.allMedia = media.filter(media => media.type.toLowerCase() === 'image')
  },
  updatePaginatorMedia (state, { key, value }) {
    state.mediaPaginator[key] = value
  },
  updateCurrentMedia (state, media)
  {
    state.currentMedia = media;
  }
}

const actions = {
  getMedia ({ commit, dispatch, getters }, payload) {
    commit('storeToStateMedia', []);
    commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true) //Common Loader Module

    if (payload.search) {
      dispatch('clearCurrentStatePaginator')
    }

     const { tag, remark, extension, startDate, endDate } = payload.filter

    ApiPrivateHttp.get('/media', {
      params: {
        limit: getters.mediaPaginator.limit,
        skip: payload ? payload.skip : 0,
        tag: tag || undefined,
        remark: remark || undefined,
        extension: extension || undefined,
        type: MEDIA_TYPE,
        from_date: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
        to_date: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined
      }
    }).then((response) => {
      commit('storeToStateMedia', response.data)
      commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module      
      commit('updatePaginatorMedia', { key: 'totalRows', value: response.total_count })
    }).catch((errors) => {
      dispatch('handleErrorResponse', { errors: errors, router: payload.router })
      commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module      
    })
  },
  uploadMedia ({ commit, dispatch }, {payload, callback}) {
    commit('loadingBar', true)
    Http({
      method: 'post',
      url: `${API_BASE_URL}/media`,
      data: payload.data.formData,
      params: { ...payload.data.queryString }
    }).then((response) => {
      console.log(response.data)
      commit('updateCurrentMedia', response.data)
      if(typeof callback=="function"){
        callback();
      }
    }).catch((errors) => {
      dispatch('handleErrorResponse', { errors: errors, router: payload.router })
      commit('loadingBar', false)
    })
  },
  updatePaginatorMedia ({ commit }, payload) {
    commit('updatePaginatorMedia', payload)
  },
  clearCurrentStatePaginator ({ commit }) {
    commit('updatePaginatorMedia', { key: 'skip', value: 0 })
    commit('updatePaginatorMedia', { key: 'currentPage', value: 1 })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
