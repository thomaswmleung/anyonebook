import Vue from 'vue'
import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'
import _ from "lodash";
import _axios from "axios";

const state = {
    shopping_cart: []
}

const getters = {
    shoppingCart:state=>_.clone(state.shopping_cart)
}

const mutations = {
    UpdateShoppingCart(state, shoppingCart)
    {
        state.shopping_cart = shoppingCart;
    }

}

const actions = {
    AddinShoppingCart({commit,dispatch}, product)
    {
        let productList = _.clone(state.shopping_cart);
        productList.push(product);
        commit("UpdateShoppingCart", productList);
    },
    purchase({commit,dispatch},{orderData})
    {
        return new Promise((resolve,reject)=>{
        //create an instance
        var instance = _axios.create({
          baseURL: API_BASE_URL,
          timeout: 8000,
          headers: {
            'accept': 'application/json',
            'token': getUser().token,
            'content-type': 'application/json'
          }
        });
        instance({
              method : "post",
              url: `/order`,
              data: orderData
              }).then((response) => {
            let message = `Book is ordered successfully`;
            response.message = message;
            resolve(response);
          })
          .catch((errors) => {
            reject(errors);
          });
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
  }