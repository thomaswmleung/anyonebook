import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { ApiPrivateHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG } from '@/env/index'
import { getUser } from '@/shared/auth-service'

//initial state 
const state = {
    current_page:{
        _id:"",
        codex:"",
        syllabus:"",
        subject:"",
        domain:"",
        area:"",
        knowledge_unit:"",
        previous_page_id:"",
        level_of_difficulty:"",
        affiliation:[],
        version:[],
        created_at:"",
        created_by:"",
        author:"",
        remark:""
    },
    current_page_affiliation:{
        publisher:"",
        book_title:"",
        version:"",
        unit:"",
        lesson_title:"",
        page_number:"",
        remark:""
    },
    current_page_version: {
        page_group_id:"",
        user:"",
        level:"",
        nature:"",
        position:"",
        output:"",
        file_url:"",
        preview_url:""        
    },
}

//getters
const getters = {}

//mutations
const mutations ={}

//actions 
const actions= {}

export default {
    state,
    getters,
    actions,
    mutations
  }
