import { chunk } from 'lodash'
import moment from 'moment'
import { Http, ApiPrivateHttp } from './../../shared/http-service'
import { API_BASE_URL } from './../../env'

const MEDIA_TYPE = 'image'

const state = {
  allMedia: [],
  mediaPaginator: {
    currentPage: 1,
    totalRows: 0,
    perPage: 12,
    limit: 12
  }
}

const getters = {
  allMedia: state => state.allMedia,
  mediaDivide: state => chunk(state.media, 4),
  mediaPaginator: state => state.mediaPaginator
}

const mutations = {
  storeToStateMedia (state, media) {
    state.allMedia = media.filter(media => media.type.toLowerCase() === 'image')
  },
  updatePaginatorMedia (state, { key, value }) {
    state.mediaPaginator[key] = value
  }
}

const actions = {
  getMedia ({ commit, dispatch, getters }, payload) {
    commit('storeToStateMedia', [])
    commit('loadingBar', true)

    if (payload.search) {
      dispatch('clearCurrentStatePaginator')
    }

    const { tag, remark, extension, startDate, endDate } = payload.filter
    console.log()
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
      commit('loadingBar', false)
      commit('updatePaginatorMedia', { key: 'totalRows', value: response.total_count })
    }).catch((errors) => {
      dispatch('handleErrorResponse', { errors: errors, router: payload.router })
      commit('loadingBar', false)
    })
  },
  uploadMedia ({ commit, dispatch }, payload) {
    commit('loadingBar', true)
    Http({
      method: 'post',
      url: `${API_BASE_URL}/media`,
      data: payload.data.formData,
      params: { ...payload.data.queryString }
    }).then((response) => {
      dispatch('showToash', { message: 'New Media Has Been Uploaded', type: 'success' })
      payload.modal.hide()
      dispatch('getMedia', { router: payload.router })
      commit('loadingBar', false)
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
