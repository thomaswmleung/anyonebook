import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { Http,ApiPrivateHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'

import {syllabus} from "@/store/static-record";
import _ from "lodash";

const state = {}

const getters = {}
const actions = {}
const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
  }
