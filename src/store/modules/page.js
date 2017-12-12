import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { ApiPrivateHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG } from '@/env/index'
import { getUser } from '@/shared/auth-service'

import {syllabus} from "@/store/static-record";
import _ from "lodash";
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
        edition:"",
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

    current_page_affiliation_index:-1,
    current_page_version_index:-1,
    

    page_syllabus_options:{
        //Static Record
        all_syllabus:syllabus,
        entitys:[],

        //Information
        codex: [
            { code: "chinese_learn_free", label: "語文自由識" },
            { code: "math_learn_free", label: "數學自由識" },
        ],
        syllabus:[
            { code: "hk_primary_chinese", label: "香港小學中文" },
            { code: "hk_primary_math", label: "香港小學數學" }
        ],
        domain:[],
        area:[],
        knowledge_unit:[],
        //Version
        user: [
            { code: "A", label: "answer" },
            { code: "S", label: "Student Un-coded" },
            { code: "R", label: "Student Coded" },
            { code: "U", label: "Teacher Un-coded" },
            { code: "T", label: "Teacher Coded" }
          ],
          level: [
            { code: "G", label: "Top Gun" },
            { code: "H", label: "High Baseline" },
            { code: "B", label: "Baseline" },
            { code: "F", label: "Support with Scaffolding" },
            { code: "D", label: "Indeterminate" },
            { code: "O", label: "Open Graphic" }
          ],
          nature: [
            { code: "P", label: "Paper or Text" },
            { code: "Q", label: "Question" },
            { code: "N", label: "Comprehension" },
            { code: "M", label: "Exam or Test" }
          ],
          position: [
            { code: "V", label: "Inside Page" },
            { code: "W", label: "Cover" },
            { code: "X", label: "Inside Cover" },
            { code: "Y", label: "Page One" },
            { code: "Z", label: "Back Cover" }
          ],
          output: [
            { code: "C", label: "Color" },
            { code: "K", label: "Black/White" }
          ]         
    }
    
}

//typed
const types  = {
    PAGE_ADD_AFFILIATION:"PAGE_ADD_AFFILIATION",
    PAGE_UPDATE_AFFILIATION:"PAGE_UPDATE_AFFILIATION",
    PAGE_ADD_VERSION:"PAGE_ADD_VERSION",
    PAGE_UPDATE_VERSION:"PAGE_UPDATE_VERSION",

    PAGE_UPDATE_OPTION:"PAGE_UPDATE_OPTION",

    PAGE_UPDATE_AFFILIATION_INDEX:"PAGE_UPDATE_AFFILIATION_INDEX",
    PAGE_UPDATE_AFFILIATION:"PAGE_UPDATE_AFFILIATION",
    PAGE_RESET_AFFILIATION:"PAGE_RESET_AFFILIATION",
    PAGE_PUSH_OR_MODIFY_AFFILIATION_ARRAY:"PAGE_PUSH_OR_MODIFY_AFFILIATION_ARRAY",
    PAGE_DELETE_AFFILIATION:"PAGE_DELETE_AFFILIATION"

}

//getters
const getters = {
    currentPage: state =>_.clone(state.current_page)  ,
    currentPageAffiliation: state => _.clone(state.current_page_affiliation),
    currentPageVersion: state => state.current_page_version,
    currentPageAffiliationIndex:state=>state.current_page_affiliation_index, 
    currentPageVersionIndex:state=>state.current_page_version_index,
    PageSyllabusOptions:state=>state.page_syllabus_options,

}

//mutations
const mutations ={
    //Parameter come with type, value
    [types.PAGE_UPDATE_OPTION] (state, params) {
        let record_set;
       //base on params.type define action 
       if(params.type=="codex"){
            !DEBUG||console.log(params);
            state.current_page.codex = params.values;
       }
       if(params.type=="syllabus"){
            !DEBUG||console.log(params);
            record_set = _.find(
                            state.page_syllabus_options.all_syllabus,
                            {code:params.values}).entitys;
            state.current_page.syllabus = params.values;
            
            //update option array  
            state.page_syllabus_options.domain = _.map(_.uniqBy(record_set,o=>o.domain), "domain");
            state.page_syllabus_options.area = _.map(_.uniqBy(record_set,o=>o.area), "area");
            state.page_syllabus_options.knowledge_unit = _.map(_.uniqBy(record_set,o=>o.knowledge_unit), "knowledge_unit");
        }
        if(params.type=="domain"){
            !DEBUG||console.log(params);
            record_set = _.find(
                            state.page_syllabus_options.all_syllabus,
                            {code:state.current_page.syllabus}).entitys;
            state.current_page.domain = params.values;
            
            record_set = _.filter(record_set, {domain:params.values}) ; 
            //update option array 
            state.page_syllabus_options.area = _.map(_.uniqBy(record_set,o=>o.area), "area");
            state.page_syllabus_options.knowledge_unit = _.map(_.uniqBy(record_set,o=>o.knowledge_unit), "knowledge_unit");
        }
        if(params.type=="area"){
            !DEBUG||console.log(params);
            record_set = _.find(
                            state.page_syllabus_options.all_syllabus,
                            {code:state.current_page.syllabus}).entitys;
            state.current_page.area = params.values;
            
            record_set = _.filter(record_set, 
                    {
                        domain:state.current_page.domain,
                        area:state.current_page.area
                    }) ; 
            //update option array             
            state.page_syllabus_options.knowledge_unit = _.map(_.uniqBy(record_set,o=>o.knowledge_unit), "knowledge_unit");
        }
        if(params.type=="knowledge_unit"){
            state.current_page.knowledge_unit = params.values;
        }
        if(params.type=="remark"){
            state.current_page.remark = params.values;
        }
    },

    [types.PAGE_UPDATE_AFFILIATION_INDEX](state,index){
        state.current_page_affiliation_index = index;
        if(index!=-1){
            state.current_page_affiliation=_.clone(state.current_page.affiliation[index]); 
        }
    },
    [types.PAGE_UPDATE_AFFILIATION](state,params){
        state.current_page_affiliation[params.attr]= params.val
    },
    [types.PAGE_RESET_AFFILIATION](state,params){
        let i ="";
        for(i in state.current_page_affiliation){
            if(typeof state.current_page_affiliation[i]=="string"){
                state.current_page_affiliation[i]="";
            }
        }
    },
    [types.PAGE_PUSH_OR_MODIFY_AFFILIATION_ARRAY](state,params){
        let _index = state.current_page_affiliation_index;
        let _affiliation = _.clone(state.current_page_affiliation);
        if(_index ==-1){
            state.current_page.affiliation.push(_affiliation);
        }else{
            state.current_page.affiliation[_index] = _affiliation;
        }
        commit(types.PAGE_RESET_AFFILIATION);   
    },
    [types.PAGE_DELETE_AFFILIATION](state,index){
        state.current_page.affiliation.splice(index,1);
    }


}

//actions 
const actions= {
    pageUpdateOption({commit},params){
        commit(types.PAGE_UPDATE_OPTION, params);
    },
    pageUpdateAffiliationIndex({commit},index){
        commit(types.PAGE_UPDATE_AFFILIATION_INDEX, index);
        if(index == -1){
            commit(types.PAGE_RESET_AFFILIATION);  
        }
    }, 
    pageUpdateAffiliation({commit},params){
        commit(types.PAGE_UPDATE_AFFILIATION,params);
    }, 
    pageResetAffiliation({commit}){
        commit(types.PAGE_RESET_AFFILIATION);
    },
    pagePushOrModifyAffiliationArray({commit}){
        commit(types.PAGE_PUSH_OR_MODIFY_AFFILIATION_ARRAY); 
        commit(types.PAGE_RESET_AFFILIATION); 
    },
    pageDeleteAffiliation({commit},index){
        let processBool = window.confirm("Are you sure?");
        if(processBool){
            commit(types.PAGE_DELETE_AFFILIATION);
        }
        
    },

}

export default {
    state,
    getters,
    actions,
    mutations
  }
