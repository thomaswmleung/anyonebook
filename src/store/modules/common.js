//initial state 
const state ={
    show_fullscreen_loader:false
}

//typed 
const types ={
    COMMOM_UPDATE_FULLSCREEN_LOADER:"COMMOM_UPDATE_FULLSCREEN_LOADER"
}

//getters
const getters ={
     fullscreen_loader:state=>state.show_fullscreen_loader, 
}

//actions
const actions={
    showFullscreenLoader({commit},boolFlag ){
        commit(types.COMMOM_UPDATE_FULLSCREEN_LOADER, boolFlag);
    }
}

//mutations
const mutations ={
    [types.COMMOM_UPDATE_FULLSCREEN_LOADER](state, boolFlag){
        state.show_fullscreen_loader = boolFlag;
    }
}

//Export Statement
export default {
    state,
    getters,
    actions,
    mutations
  }