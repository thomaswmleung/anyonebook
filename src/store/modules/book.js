import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { Http,ApiPrivateHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'

import {syllabus} from "@/store/static-record";
import _ from "lodash";

const state = {}

// retrive the value from the state 
const getters = {
  
}

// modify value in the state
const mutations = {

}

// connect with external source or multiple mutation in single action
const actions = {

}


export default {
    state,
    getters,
    actions,
    mutations
  }
