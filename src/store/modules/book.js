import Vue from 'vue'
//import { indexOf, each } from 'lodash'
//import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
//import { toQueryParams } from '@/shared/helpers'
//import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'
//import {syllabus} from "@/store/static-record";
import _ from "lodash";
//import _axios from "axios";
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
  createBook({commit,dispatch},{book}){
    book.user_token = getUser().token
    if (book._id != ""){
      //update book if id exist
      //ref: https://www.npmjs.com/package/vue-firestore
      db.collection('book').doc(book._id).update(book).then(
        response => {
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      //creaate book if id not exist
      db.collection('book').add(book)
        .then(response => {
          //update the book._id to be the same as book data id in firebase
          //ref: https://scotch.io/tutorials/getting-started-with-firebase-cloud-firestore-build-a-vue-contact-app
          db.collection('book').where("_id", "==", "").get()
            .then((querySnapshot) => {
              let data = {}
              querySnapshot.forEach((doc) => {
                data = {
                  _id: doc.id,
                  content: doc.data().content,
                  metadata: doc.data().metadata
                }
              })
              db.collection('book').doc(data._id).update(data)
                .then(response => {
                })
                .catch((errors) => {
                  console.log(errors);
                });
            })
            .catch((errors) => {
              console.log(errors);
            });
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  },

  deleteBook({commit,dispatch},{book,callback}){
    //create an instance
    //var instance = _axios.create({
      //baseURL: API_BASE_URL,
      //timeout: 8000,
      //headers: {
        //'accept': 'application/json',
        //'token': getUser().token
      //}
    //});
    let processBool = window.confirm("Are you sure?");
    if (processBool){

        db.collection('book').doc(book._id).delete()
        //return new Promise((resolve,reject)=>{
            //instance({
                //method: 'delete',
                //url: '/static_html_page',
                //params: {
                    //'_id': book._id
                //}
              //})
          .then(response=>{
              //fetchdata after delete
              if( typeof callback == "function"){
                callback(response);
              }
            }
        ).catch((errors) => {
          console.log(errors);
        });
    }
  },

  getBook({commit,dispatch},{paginator, book_filter}){
      console.log(paginator, book_filter)
      commit('COMMOM_UPDATE_FULLSCREEN_LOADER',true)   //Common Loader Module
      //https://scotch.io/tutorials/getting-started-with-firebase-cloud-firestore-build-a-vue-contact-app
      db.collection('book').get().then((querySnapshot) => {
        commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
        var result = [];
        querySnapshot.forEach((doc) => {
          let pageObj = {};
          let _data = doc.data().metadata;
          //to match with searching filter
          if ((book_filter.codex == "" || _data.codex == book_filter.codex) &&
              (book_filter.grade == "" || _data.grade == book_filter.grade) &&
              (book_filter.publicity == "" || _data.publicity == book_filter.publicity) &&
              (book_filter.school_name == "" || _data.school_name == book_filter.school_name)){
                //to get book which public or private match with user token
                if (book_filter.publicity == "Public" || doc.data().user_token == getUser().token){
                  pageObj._id = doc.data()._id;
                  pageObj.content = doc.data().content;
                  pageObj.metadata = doc.data().metadata;
                  pageObj.user_token = doc.data().user_token;
                  result.push(pageObj);
                }
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

