import Vue from 'vue'
import { indexOf } from 'lodash'
import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'
import _ from "lodash";
import _axios from "axios";
import book from './book';

const state = {
    shopping_cart: [],
    OrderBooks:{}
}

const getters = {
    shoppingCart:state=>_.clone(state.shopping_cart),
    OrderBooks:state=>state.OrderBooks
}

const mutations = {
    UpdateShoppingCart(state, shoppingCart){
        state.shopping_cart = shoppingCart;
    },
    AddBooks(state, book){
        state.OrderBooks[book._id] = book;
    },
    UpdateBooklist(state, booklist){
        state.OrderBooks = booklist;
    }
}

const actions = {
    updateQuantity({commit,dispatch}, {book, quantity})
    {
        let productList = _.cloneDeep(state.shopping_cart);
        let index = _.findIndex(productList, ['book_id', book._id]);
        if (index !== -1) {
            productList[index].book_qty = quantity;
            commit("UpdateShoppingCart", productList);
        }
    },
    AddinShoppingCart({commit,dispatch}, {product, book})
    {
        let productList = _.cloneDeep(state.shopping_cart);
        let index = _.findIndex(productList, ['book_id', book._id]);
        if (index != -1)
        {
            let quantity = productList[index].book_qty + product.book_qty
            productList[index].book_qty = quantity;
            commit("UpdateShoppingCart", productList);
        }
        else
        {
            productList.push(product);
            commit("UpdateShoppingCart", productList);
            commit("AddBooks", book)
        }
    },
    deleteShoppingCart({commit,dispatch}, {id})
    {
        let processBool = window.confirm("Are you sure?");
        if (processBool){
            let productList = _.clone(state.shopping_cart);
            let booklist = _.clone(state.OrderBooks)
            let index = _.findIndex(productList, ['book_id', id]);
            if (index !== -1) {
                productList.splice(index, 1);
                // booklist.splice(id, 1);
                delete booklist[id];
                commit("UpdateShoppingCart", productList);
                commit("UpdateBooklist", booklist)
            }
        }
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