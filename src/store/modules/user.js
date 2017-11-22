

// initial state
const state = {
  user_id:"",
  profile:{},
  role:"",
  error_message:""
}

// typed
const types = {
    UPDATE_PROFILE:"UPDATE_PROFILE",
    UPDATE_ERROR_MESSAGE:"UPDATE_ERROR_MESSAGE"
}

// getters
const getters = {
  userProfile: state => state.profile ,
  userId: state => state.user_id,
  userRole: state => state.userRole,
  userErrorMessage: state => state.error_message
}

// actions
const actions = {
  userLogin ({ commit },username, password) {
    // shop.getProducts(products => {
    //   commit(types.RECEIVE_PRODUCTS, { products })
    // })
    
    //mutations the profile, 
  },
  userLogout({commit}){
    commit(types.UPDATE_ERROR_MESSAGE, "")
    commit(types.UPDATE_PROFILE, {})
  }

}

// mutations
const mutations = {
  [types.UPDATE_ERROR_MESSAGE] (state, message) {
    state.userErrorMessage = message;
  },

  [types.UPDATE_PROFILE] (state, profile) {
    state.profile = profile;
    state.role = profile.role || "";
    state.user_id = profile.id || "";
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}