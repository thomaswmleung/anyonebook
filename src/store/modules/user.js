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

const getters={};

const mutations={
  mutUpdateMetaData(state, {attribute,parameter}){
    _.set(state, `metadata.${attribute}`,parameter);
  }
};

const actions={
  actUpdateMetaData({commit},{attribute,parameter}){
    commit('mutUpdateMetaData', {attribute,parameter})
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
