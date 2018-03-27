import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'
import {syllabus} from "@/store/static-record";
import _ from "lodash";
import _axios from "axios";
import { db } from "../../main";

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
  grade_items:["p1A", "p2A",  "p3A",  "p4A",  "p5A",  "p6A"],
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
  },
  mutResetBook(state){
    state.current_book= {
        _id:"",
        row_record:[],
        metadata:{}
    }
  }
}

// connect with external source or multiple mutation in single action
const actions = {
  // createBook({commit,dispatch},{book}){
  //   return new Promise((resolve,reject)=>{
  //       let {_id, page_code, content, metadata}=book;
  //       console.log(getUser,getUser());

  //       let reference1=getUser().id,
  //           reference2=metadata.codex,
  //           reference3=metadata.grade,
  //           reference4=metadata.school_name,
  //           reference5=metadata.publicity;
  //       let method = _id!=""?"put":'post';
  //       //create an instance
  //       var instance = _axios.create({
  //         baseURL: API_BASE_URL,
  //         timeout: 8000,
  //         headers: {
  //           'accept': 'application/json',
  //           'token': getUser().token,
  //           'content-type': 'application/x-www-form-urlencoded'
  //         }
  //       });
  //       instance({
  //             method,
  //             url: method=="post"?`/static_html_page?page_code=${page_code}`:  //url used if post
  //                             `/static_html_page?static_html_page_id=${_id}&page_code=${page_code}`, //url used if put
  //             // data: method=="post"? `content=${content}`: //data needed if post
  //             //                   `content=${content}&reference_1=${reference1}&reference_2=${reference2}&reference_3=${reference3}&reference_4=${reference4}&reference_5=${reference5}`
  //                 data:  `content=${content}&reference_1=${reference1}&reference_2=${reference2}&reference_3=${reference3}&reference_4=${reference4}&reference_5=${reference5}`,
  //             //data needed if put
  //             }).then((response) => {
  //           let message = `Book is ${_id!=""?"Updated":"Created"} successfully`;
  //           response.message = message;
  //           resolve(response);
  //         })
  //         .catch((errors) => {
  //           reject(errors);
  //         });
  //       });
  // },

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

  getBook({commit,dispatch},{paginator, book_filter}){
    //create an instance
    console.log(paginator, book_filter)
    // var instance = _axios.create({
    //   baseURL: API_BASE_URL,
    //   timeout: 8000,
    //   headers: {
    //     'accept': 'application/json'
    //   }
    // })
      commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true)   //Common Loader Module
      // instance({
      //     method: 'get',
      //     url: '/static_html_page',
      //   params: {
      //     limit: paginator.limit ||8,
      //     skip: paginator.skip|| 0,
      //     reference_1: book_filter.publicity=="Private"? getUser()._id:"",
      //     reference_2: book_filter.codex,
      //     reference_3: book_filter.grade,
      //     reference_4: book_filter.school_name,
      //     reference_5: book_filter.publicity
      //   }
      // })
      db.collection('book').get().then((querySnapshot) => {
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
        var result = [];
        querySnapshot.forEach((doc) => {
          let pageObj = {};
          let _data = doc.data().metadata; // TODO need to check it is a valid JSON string
          if ((book_filter.codex == "" || _data.codex == book_filter.codex) &&
              (book_filter.codex == "" || _data.grade == book_filter.grade) &&
              (book_filter.publicity == "" || _data.publicity == book_filter.publicity) &&
              (book_filter.school_name == "" || _data.school_name == book_filter.school_name)){
                pageObj._id = doc.data()._id;
                pageObj.content = doc.data().content;
                pageObj.metadata = doc.data().metadata;
                result.push(pageObj);
          }
        })
        commit("mutUpdateBooks",result); // return result;
        commit("mutUpdateBookPaginator", result.length)
      }).catch((errors) => {
        console.log(errors);
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
      })
  },

  getBookById({commit}, {id, callback}){
    db.collection('book').where("_id", "==", id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data()._id == id){
          let _data = JSON.parse(doc.data().content)
          let current_book_obj = {
            _id: doc.data()._id,
            row_record:_data.row_pages,
            metadata:_data.book_metadata
          }
          commit("mutUpdateCurrentBook", current_book_obj);
          if(typeof callback=="function"){
            callback(current_book_obj);
          }
        }
      })
    })
  },
  // getBookById({commit},{id,callback}){
  //   commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true) //Common Loader Module
  //   //create an instance
  //   var instance = _axios.create({
  //     baseURL: API_BASE_URL,
  //     timeout: 8000,
  //     headers: {
  //       'accept': 'application/json'
  //     }
  //   })
  //     commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true)   //Common Loader Module
  //     instance({
  //         method: 'get',
  //         url: `/static_html_page/${id}`
  //     }).then((response) => {
  //       commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
  //       let _data = JSON.parse(response.data.data.content)
  //       let current_book_obj = {
  //         _id:id,
  //         row_record:_data.row_pages,
  //         metadata:_data.book_metadata
  //       };
  //       commit("mutUpdateCurrentBook", current_book_obj);
  //       if(typeof callback=="function"){
  //         callback(current_book_obj);
  //       }
  //   });
  // // },
  resetBook({commit}){
    commit("mutResetBook");
  }
}


export default {
    state,
    getters,
    actions,
    mutations
  }

