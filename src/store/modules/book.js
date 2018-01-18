import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'

import {syllabus} from "@/store/static-record";
import _ from "lodash";
import _axios from "axios";

const state = {
  all_books:[],
  book_paginator:{
    total_count:0,
    limit:8,
    current_page:1
  },
  current_book:{
    _id:"",
    row_record:[],
    metadata:{}
  },
  grade_items:["p1A", "p1B", "p2A", "p2B", "p3A", "p3B", "p4A", "p4B", "p5A", "p5B", "p6A", "p6B"],
  publicity_items:["Public", "Private"]

}

// retrive the value from the state 
const getters = {
  books:state=>_.clone(state.all_books),
  bookPaginator:state=>state.book_paginator,
  currentBook: state =>_.clone(state.current_book),
  gradeItem: state=>_.clone(state.grade_items),
  publicityItem: state=>_.clone(state.publicity_items)   
}

// modify value in the state
const mutations = {
  mutUpdateBooks(state, books) {
      state.all_books= books;
  },
  mutUpdateBookPaginator(state, total_count) {
      state.book_paginator.total_count = total_count;
  },
  mutUpdateCurrentBook(state, book) {
      state.current_book = book;
  }
}

// connect with external source or multiple mutation in single action
const actions = {
  createBook({commit,dispatch},{book}){
    return new Promise((resolve,reject)=>{
        let {_id, page_code, content, metadata}=book;
        let reference1=getUser().id,
            reference2=metadata.codex, 
            reference3=metadata.grade,
            reference4=metadata.school_name, 
            reference5=metadata.publicity; //temporary bug
        let method = _id!=""?"put":'post';  
        //create an instance
        var instance = _axios.create({
          baseURL: API_BASE_URL,
          timeout: 8000,
          headers: {
            'accept': 'application/json',
            'token': getUser().token,
            'content-type': 'application/x-www-form-urlencoded'
          }
        });
        instance({
              method,
              url: method=="post"?`/static_html_page?page_code=${page_code}`:  //url used if post
                              `/static_html_page?static_html_page_id=${_id}&page_code=${page_code}`, //url used if put
              data: method=="post"? `content=${content}`: //data needed if post
                                `content=${content}&reference_1=${reference1}&reference_2=${reference2}&reference_3=${reference3}&reference_4=${reference4}&reference_5=${reference5}`
                                //data needed if put
              }).then((response) => {
            let message = `Book is ${_id!=""?"Updated":"Created"} successfully`;
            response.message = message;
            resolve(response);
          })
          .catch((errors) => {
            reject(errors);
          });
        });
  },
  
  deleteBook({commit,dispatch},{book,callback}){
    //create an instance
    var instance = _axios.create({
      baseURL: API_BASE_URL,
      timeout: 8000,
      headers: {
        'accept': 'application/json',
        'token': getUser().token
      }
    });
    let processBool = window.confirm("Are you sure?");
    if (processBool){
        return new Promise((resolve,reject)=>{
            instance({
                method: 'delete',
                url: '/static_html_page',
                params: {
                    '_id': book._id
                }
              }).then(
                  response=>{
                    let message = `Book is deleted successfully`;
                    response.message = message;
                    //fetchdata after delete
                    if( typeof callback == "function"){
                      callback(response);
                    }
                    resolve(response);
                  }
              ).catch((errors) => {
                reject(errors);
              });
        })
    }
  },

  getBook({commit,dispatch},{paginator}){
    //create an instance
    var instance = _axios.create({
      baseURL: API_BASE_URL,
      timeout: 8000,
      headers: {
        'accept': 'application/json'
      }
    })
      commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true)   //Common Loader Module
      instance({
          method: 'get',
          url: '/static_html_page',
        params: {
          limit: paginator.limit ||8,
          skip: paginator.skip|| 0,
          search_key: getUser()._id 
        }
      }).then((response) => {
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
        var result = [];
        let pageObj = {};
        for (var i = 0; i < response.data.data.length; i++)
        {
          pageObj = JSON.parse(response.data.data[i].content); // TODO need to check it is a valid JSON string 
          pageObj._id = response.data.data[i]._id;
          pageObj.created_at = response.data.data[i].created_at;
          pageObj.metadata = JSON.parse(response.data.data[i].content).book_metadata;
          result.push(pageObj);
        }
        commit("mutUpdateBooks",result); // return result;
        commit("mutUpdateBookPaginator", response.data.total_count)
      }).catch((errors) => {
        console.log(errors);
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
      })
  },

  getBookById({commit,getters},{id,callback}){
    commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true) //Common Loader Module
    //create an instance
    var instance = _axios.create({
      baseURL: API_BASE_URL,
      timeout: 8000,
      headers: {
        'accept': 'application/json'
      }
    })
      commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true)   //Common Loader Module
      instance({
          method: 'get',
          url: `/static_html_page/${id}`
      }).then((response) => {
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
        let _data = JSON.parse(response.data.data.content)
        let current_book_obj = {
          _id:id,
          row_record:_data.row_pages,
          metadata:_data.book_metadata
        };
        commit("mutUpdateCurrentBook", current_book_obj);
        if(typeof callback=="function"){
          callback(current_book_obj);
        }
    });

},
}


export default {
    state,
    getters,
    actions,
    mutations
  }
