import Vue from 'vue'
import { indexOf } from 'lodash'
import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'
import _ from "lodash";

const state={
  metadata:{
    email:"",
    first_name:"",
    last_name:"",
    avator:"",
    shortbio:"",
    display_name:"",
    longbio:"",
    gender:"",
    address:"",
    facebook:"",
    twitter:"",
    pintrest:"",
    website:"",
    joindate:"",
    remark:"",
    school:[],
    family:[]
  }
};

const getters={
  userMetaData:state=>_.cloneDeep(state.metadata)
};

const mutations={
  mutUpdateUserMetaData(state, {attribute,parameter}){
    _.set(state, `metadata.${attribute}`,parameter);
  }
};

const actions={
  actUpdateUserMetaData({commit},{attribute,parameter}){
    commit('mutUpdateUserMetaData', {attribute,parameter})
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
