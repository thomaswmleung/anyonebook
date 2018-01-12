import Vue from 'vue'
import { indexOf, each } from 'lodash'
import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
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
  createBook({commit,dispatch},{book}){
    return new Promise((resolve,reject)=>{
        let {_id, page_code, content}=book;
        let method = _id!=""?"put":'post';
       
       
        
        // ApiPrivateHttp[method]('/static_html_page', JSON.stringify(book))
        // ApiPrivateHttp[method](`/static_html_page?page_code=${page_code}&content=${content}`,)
        // ApiPrivateHttp({
        //   method,
        //   url: '/static_html_page',
        //   params: {
        //     page_code, content
        //   }
        // })
        ApiPrivateHttp[method]('/book', JSON.stringify(book)).then((response) => {
            let message = `Book is ${_id!=""?"Updated":"Created"} successfully`;
            response.message = message;
            resolve(response);
          })
          .catch((errors) => {
            reject(errors);
          });
    });
  },
  
  deleteBook({commit},{book}){
    let processBool = window.confirm("Are you sure?");
    if (processBool){
        // console.log(JSON.stringify(payload.page));
        return new Promise((resolve,reject)=>{
            ApiPrivateHttp({
                method: 'delete',
                url: '/static_html_page',
                params: {
                    '_id': book._id
                }
              }).then(
                  response=>{
                    let message = `Book is deleted successfully`;
                    response.message = message;
                    resolve(response);
                  }
              ).catch((errors) => {
                reject(errors);
              });
        })
    }
}
}


export default {
    state,
    getters,
    actions,
    mutations
  }
