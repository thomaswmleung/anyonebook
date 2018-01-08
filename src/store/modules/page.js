import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { Http,ApiPrivateHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'


//import {syllabus} from "@/store/static-record";
import _ from "lodash";
//initial state 
const state = {
    all_pages:[],
    page_paginator:{
        current_page:1,
        total_count:0,
        limit:8
    },
    current_page:{
        _id:"",
        codex:"",
        syllabus_code:"",
        subject:"",
        domain:"",
        area:"",
        knowledge_unit:"",
        learning_objective:[],
        particular:"",
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
        remark:"",
        file_url:"",
        preview_url:""        
    },

    current_page_affiliation_index:-1,
    current_page_version_index:-1,
    
    page_syllabus_options:{
        //Static Record
        all_syllabus:{},
        entitys:[],

        //Information
        codex: [
            { code: "math-quick-and-accurate", label: "數學精準快",syllabus:"hk-maths-2002" },
            { code: "math-mock-100", label: "數學模擬試一百",syllabus:"hk-maths-2002"},
            { code: "math-learn-free", label: "數學自由識",syllabus:"hk-maths-2002" },
            { code: "chinese-mock-100", label: "中文模擬試一百",syllabus:"hk-chinese" },
            { code: "chinese-reading", label: "閱讀 + 理解" ,syllabus:"hk-chinese"},
            { code: "chinese-learn-free", label: "語文自由識" ,syllabus:"hk-chinese"},
        ],
        syllabus:[
            { code: "hk-maths-2002", label: "香港小學數學 2002" },
            { code: "hk-maths-2017", label: "香港小學數學 2017" },
            { code: "hk-chinese", label: "香港小學中文" },
        ],
        domain:[],
        area:[],
        knowledge_unit:[],
        //Version
        user: [
            { code: "", label: "" },
            { code: "A", label: "answer" },
            { code: "S", label: "Student Un-coded" },
            { code: "R", label: "Student Coded" },
            { code: "U", label: "Teacher Un-coded" },
            { code: "T", label: "Teacher Coded" }
          ],
          level: [
            { code: "", label: "" },
            { code: "G", label: "Top Gun" },
            { code: "H", label: "High Baseline" },
            { code: "B", label: "Baseline" },
            { code: "F", label: "Support with Scaffolding" },
            { code: "D", label: "Indeterminate" },
            { code: "O", label: "Open Graphic" }
          ],
          nature: [
            { code: "", label: "" },
            { code: "P", label: "Paper or Text" },
            { code: "Q", label: "Question" },
            { code: "N", label: "Comprehension" },
            { code: "M", label: "Exam or Test" }
          ],
          position: [
            { code: "", label: "" },
            { code: "V", label: "Inside Page" },
            { code: "W", label: "Cover" },
            { code: "X", label: "Inside Cover" },
            { code: "Y", label: "Page One" },
            { code: "Z", label: "Back Cover" }
          ],
          output: [
            { code: "", label: "" },
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

    PAGE_UPDATE_SYLLABUS:"PAGE_UPDATE_SYLLABUS",
    PAGE_UPDATE_OPTION:"PAGE_UPDATE_OPTION",
    PAGE_RESET_OPTION:"PAGE_RESET_OPTION",
    //Affiliation Mutation Type
    PAGE_UPDATE_AFFILIATION_INDEX:"PAGE_UPDATE_AFFILIATION_INDEX",
    PAGE_UPDATE_AFFILIATION:"PAGE_UPDATE_AFFILIATION",
    PAGE_RESET_AFFILIATION:"PAGE_RESET_AFFILIATION",
    PAGE_PUSH_OR_MODIFY_AFFILIATION_ARRAY:"PAGE_PUSH_OR_MODIFY_AFFILIATION_ARRAY",
    PAGE_DELETE_AFFILIATION:"PAGE_DELETE_AFFILIATION",
    /* Affiliation Mutation Type End */

    //Page Version Mutation Type
    PAGE_UPDATE_VERSION_INDEX:"PAGE_UPDATE_VERSION_INDEX",
    PAGE_UPDATE_VERSION:"PAGE_UPDATE_VERSION",
    PAGE_RESET_VERSION:"PAGE_RESET_VERSION",
    PAGE_PUSH_OR_MODIFY_VERSION_ARRAY:"PAGE_PUSH_OR_MODIFY_VERSION_ARRAY",
    PAGE_DELETE_VERSION:"PAGE_DELETE_VERSION",
    /* Page Version Mutation Type End */

    //Page Mutation
    PAGE_SET_CURRENT_PAGE:"PAGE_SET_CURRENT_PAGE",

    PAGE_SET_LIST:"PAGE_SET_LIST",

    /* Page Mutation Type End*/

}

//getters
const getters = {
    currentPage: state =>_.clone(state.current_page)  ,
    currentPageAffiliation: state => _.clone(state.current_page_affiliation),
    currentPageVersion: state => _.clone(state.current_page_version),
    currentPageAffiliationIndex:state=>state.current_page_affiliation_index, 
    currentPageVersionIndex:state=>state.current_page_version_index,


    PageSyllabusOptions:state=>state.page_syllabus_options,
    pagePaginator:state=>state.page_paginator,
    allPages:state=>state.all_pages,
    

}

//mutations
const mutations ={
    
    //Affiliation Mutation
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
    },
    [types.PAGE_DELETE_AFFILIATION](state,index){
        let obj = state.current_page.affiliation.splice(index,1);
        DEBUG||console.log(index, obj);
    },
    /*** Affiliation Mutation End ***/

    //Page Version Mutation
    [types.PAGE_UPDATE_VERSION_INDEX](state,index){
        state.current_page_version_index = index;
        if(index!=-1){
            state.current_page_version=_.clone(state.current_page.version[index]); 
        }
    },
    [types.PAGE_UPDATE_VERSION](state,params){
        state.current_page_version[params.attr]= params.val
    },
    [types.PAGE_RESET_VERSION](state,params){
        let i ="";
        for(i in state.current_page_version){
            if(typeof state.current_page_version[i]=="string"){
                state.current_page_version[i]="";
            }
        }
    },
    [types.PAGE_PUSH_OR_MODIFY_VERSION_ARRAY](state,params){
        let _index = state.current_page_version_index;
        let _version = _.clone(state.current_page_version);
        if(_index ==-1){
            state.current_page.version.push(_version);
        }else{
            state.current_page.version[_index] = _version;
        }  
    },
    [types.PAGE_DELETE_VERSION](state,index){
        let obj = state.current_page.version.splice(index,1);
        DEBUG||console.log(index, obj);
    },
    /*** Page Version Mutation End ***/
    

    //Page Mutation
    [types.PAGE_UPDATE_SYLLABUS](state,{code,list}){
        state
        .page_syllabus_options
        .all_syllabus[code] = list;
    },

    //Parameter come with type, value
    [types.PAGE_UPDATE_OPTION] (state, params) {
        let record_set;
        //base on params.type define action 
        if(params.type=="codex"){
                !DEBUG||console.log(params);
                state.current_page.codex = params.values;
        }
        if(params.type=="syllabus_code"){
                console.log(params);
                // record_set = _.find(
                //                 state.page_syllabus_options.all_syllabus,
                //                 {code:params.values}).entitys;
                record_set = state.page_syllabus_options.all_syllabus[params.values];
                state.current_page.syllabus_code = params.values;
                state.current_page.domain = "";
                state.current_page.area ="";

                //update option array  
                state.page_syllabus_options.domain = _.map(_.uniqBy(record_set,o=>o.domain), "domain");
                state.page_syllabus_options.area = _.map(_.uniqBy(record_set,o=>o.area), "area");
                state.page_syllabus_options.knowledge_unit = _.map(_.uniqBy(record_set,o=>o.knowledge_unit), "knowledge_unit");
            }
            if(params.type=="domain"){
                !DEBUG||console.log(params);
                record_set = state.page_syllabus_options.all_syllabus[ state.current_page.syllabus_code ];
                
                state.current_page.domain = params.values;
                state.current_page.area ="";
                
                record_set = _.filter(record_set, {domain:params.values}) ; 
                //update option array 
                state.page_syllabus_options.area = _.map(_.uniqBy(record_set,o=>o.area), "area");
                state.page_syllabus_options.knowledge_unit = _.map(_.uniqBy(record_set,o=>o.knowledge_unit), "knowledge_unit");
            }
            if(params.type=="area"){
                !DEBUG||console.log(params);
                record_set = state.page_syllabus_options.all_syllabus[ state.current_page.syllabus_code ];
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
            if(params.type=="_id"){
                state.current_page._id = params.values;
            }
            state.current_page[params.type]= params.values;
        },
        [types.PAGE_RESET_OPTION](state, params) {
            let i ="";
            for(i in state.current_page){
                if(typeof state.current_page[i]=="string"){
                    state.current_page[i]="";
                }
            }
            state.current_page.version = [];
        },
        [types.PAGE_SET_CURRENT_PAGE](state,params){
            console.log(types.PAGE_SET_CURRENT_PAGE,params);
            state.current_page = params;
        },
        [types.PAGE_SET_LIST](state,params){
            state.all_pages = params.data;
            state.page_paginator.total_count = params.total_count; 
        }



        /** Page Mutation End **/

}

//actions 
const actions= {

    //Affiliation Actions
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
            commit(types.PAGE_DELETE_AFFILIATION,index);
        }
    },
    /*** Affiliation Actions End***/

   //Version Actions
    pageUpdateVersionIndex({commit},index){
        commit(types.PAGE_UPDATE_VERSION_INDEX, index);
        if(index == -1){
            commit(types.PAGE_RESET_VERSION);  
        }
    }, 
    pageUpdateVersion({commit},params){
        commit(types.PAGE_UPDATE_VERSION,params);
    }, 
    pageResetVersion({commit}){
        commit(types.PAGE_RESET_VERSION);
    },
    pagePushOrModifyVersionArray({commit}){
        commit(types.PAGE_PUSH_OR_MODIFY_VERSION_ARRAY); 
        commit(types.PAGE_RESET_VERSION); 
    },
    pageDeleteVersion({commit},index){
        let processBool = window.confirm("Are you sure?");
        if(processBool){
            commit(types.PAGE_DELETE_VERSION,index);
        }
    },
    pageUploadVersion({commit},{formData,params}){
        
        return new Promise((resolve,reject)=>{
            Http({
                method: 'post',
                url: `${API_BASE_URL}/media`,
                data: formData,
                params
              }).then(
                  response=>{
                      resolve(response);
                  }
              );
        })
    },
    /*** Version Actions End***/

    //Page Action
    getStyllabus(syllabusCode){
        return new Promise((resolve,reject)=>{
          Http({
              method: 'get',
              url: `/static/${syllabusCode}.tsv`,
            }).then(
                response=>{
                  let items=[]; 
                  let fields = ["domain","area","knowledge_unit","learning_objective","particulars"];  
                  let rowArray = response.split('\n');
                  rowArray.forEach(row=>{
                      let obj = {};
                      let attrs = row.split('\t');
                      fields.forEach((str,idx)=>{
                          obj[str] = attrs[idx];
                      })
                      items.push(obj);
                  });
                  resolve(items);
                }
            );
  
        });
    },
    pageUpdateOption({commit},params){
       
        if(params.type=="syllabus_code" 
            && !state.page_syllabus_options.all_syllabus[params.values]){
            actions.getStyllabus(params.values).then(response=>{
                commit(types.PAGE_UPDATE_SYLLABUS,{code:params.values, list:response});
                commit(types.PAGE_UPDATE_OPTION, params);    
            })
        }else{
            commit(types.PAGE_UPDATE_OPTION, params);
        }
        
    },
    pageResetOption({commit}){
        commit(types.PAGE_RESET_OPTION);
    },
    getPageById({commit,getters},id){
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true) //Common Loader Module

        // const {title,sub_title,subject,domain,subdomain,startDate,endDate} = filter; 

        ApiPrivateHttp.get(`/page_group/${id}`)
        .then(response=>{
            commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module 
            let current_page_obj = {
                _id:response.data._id,
                codex:response.data.codex,
                syllabus:response.data.layout||"hk_primary_chinese",
                subject:response.data.subject,
                domain:response.data.domain,
                area:response.data.subdomain,
                knowledge_unit:response.data.sub_title,
                previous_page_id:"",
                level_of_difficulty:"",
                affiliation:[],
                version:response.data.versions,
                created_at:"",
                created_by:"",
                author:"",
                remark:response.data.remark
            };
            commit(types.PAGE_UPDATE_OPTION,
                {type:"syllabus",
                values:current_page_obj.syllabus}
            );
            commit(types.PAGE_SET_CURRENT_PAGE,current_page_obj);
        });
        
    },
    getPages({commit,dispatch},{paginator,filters,router}){
        let {title, 
            sub_title,
            domain, 
            subdomain,
            codex,
            remark, 
            startDate, 
            endDate, } = filters;
            commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true)   //Common Loader Module      
        ApiPrivateHttp.get('/page_group', {
            params: {
              limit: paginator.limit ||10,
              skip: paginator.skip|| 0,
              title: title || undefined,
              sub_title: sub_title || undefined,
              subdomain: subdomain || undefined,
              codex: codex || undefined,
              from_date: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
              to_date: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined
            }
          }).then((response) => {
            commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module 
            console.log(response);
            commit(types.PAGE_SET_LIST,response)                 
          }).catch((errors) => {
            dispatch('handleErrorResponse', { errors: errors, router })
            commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module      
          })
    },    
    createPage({commit,dispatch},payload){
        return new Promise((resolve,reject)=>{
            let method = 'post'
            if (payload.page._id!="") {
              method = 'put'
            }            
            ApiPrivateHttp[method]('/page_group', JSON.stringify(payload.page))
              .then((response) => {
                let message = `Page is ${payload.page._id!=""?"Updated":"Added"} successfully`;
                response.message = message;
                resolve(response);
              })
              .catch((errors) => {
                reject(errors);
              });
        });
    },
    updatePage({commit},payload){

    },

    /*** Page Action End***/


}

export default {
    state,
    getters,
    actions,
    mutations
  }
