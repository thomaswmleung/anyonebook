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
    getStyllabus({commit},syllabusCode){

      return new Promise((resolve,reject)=>{
        Http({
            method: 'get',
            url: `/static/${syllabusCode}.tsv`,
          }).then(
              response=>{
                let items=[]; 
                let fields = ["domain","area","kownledge_unit","learning_objective","particulars"];  
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
    }
}


export default {
    state,
    getters,
    actions,
    mutations
  }
