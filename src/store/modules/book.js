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
    limit:10,
    current_page:1
  },
  current_book:{
    _id:"",
    row_record:[]
  },

}

// retrive the value from the state 
const getters = {
  books:state=>_.clone(state.all_books),
  bookPaginator:state=>state.book_paginator,
  currentBook: state =>_.clone(state.current_book)   
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
        let {_id, page_code, content}=book;
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
              url: `/static_html_page?page_code=${page_code}`,
              data:`content=${content}`
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
          limit: paginator.limit ||10,
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
        console.log(response)
        let current_book_obj = {
          _id:id,
          row_record: JSON.parse(response.data.data.content)
        };
        console.log(current_book_obj.row_record)
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
