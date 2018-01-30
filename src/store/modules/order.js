import Vue from 'vue'
import { indexOf } from 'lodash'
import { Http,ApiPrivateHttp, ApiHttp } from '@/shared/http-service'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'
import { getUser } from '@/shared/auth-service'
import _ from "lodash";
import _axios from "axios";
import book from './book';

const state = {
    all_orders: [],
    shopping_cart: [],
    OrderBooks:{}
}

const getters = {
    shoppingCart:state=>_.clone(state.shopping_cart),
    OrderBooks:state=>state.OrderBooks,
    allOrders:state=>_.clone(state.all_orders)
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
    },
    UpdateAllOrders(state, orderlist){
        state.all_orders = orderlist;
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
    },
    getOrder({commit,dispatch})
    {
        return new Promise((resolve,reject)=>{
        var instance = _axios.create({
            baseURL: API_BASE_URL,
            timeout: 8000,
            headers: {
              'accept': 'application/json',
              'token': getUser().token
            }
          });
          instance({
                method : "get",
                url: `/order`
            }).then((response) => {
                commit('COMMOM_UPDATE_FULLSCREEN_LOADER',false) //Common Loader Module
                commit("UpdateAllOrders", response.data.data); // return result;
                resolve(response);
            })
            .catch((errors) => {
                reject(errors);
            });
        })
    },
    deleteOrder({commit,dispatch},{id, callback})
    {
        let processBool = window.confirm("Are you sure?");
        if (processBool){
            return new Promise((resolve,reject)=>{
                var instance = _axios.create({
                    baseURL: API_BASE_URL,
                    timeout: 8000,
                    headers: {
                    'accept': 'application/json',
                    'token': getUser().token
                    }
                });
                instance({
                        method : "delete",
                        url: `/order?_id=${id}`
                }).then((response) => {
                    let message = `Order is deleted successfully`;
                    response.message = message;
                    //fetchdata after delete
                    if( typeof callback == "function"){
                      callback(response);
                    }
                    resolve(response);
                })
                .catch((errors) => {
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