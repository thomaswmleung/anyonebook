<template>
  <v-dialog v-model="show" persistent max-width="1500px" >
      <v-container fluid text-xs-center style="background-color:#ffffff;">
        <v-layout row wrap>
          <v-select
            :items="payment_items"
            v-model="payment_details"
            label="Payment"
            autocomplete
          ></v-select>
          <v-btn color="blue darken-1" flat @click.stop = "processOrder();">
              {{$t("Purchase")}}
          </v-btn>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');">
            {{$t("Close")}}
          </v-btn>
        </v-layout>
      </v-container>
  </v-dialog>
</template>
<style>
</style>
<script>
  import Vue from 'vue'
  import {mapGetters,mapActions} from "vuex"
  import moment from 'moment'
  import { getExtension } from '@/shared/helpers'
  import { getUser } from '@/shared/auth-service'

  export default{
      name:"OrderFormModal",
      components:{
        
      },
      props:["show"],
      data(){
        return{
          payment_details:"",
          payment_items:["Cash", "Credit Card"]
        }
      }, 
      watch: {
    },
  methods: {
    ...mapActions([
      "purchase"
    ]),
    processOrder()
    {
      let order = {};
      order.user_id = getUser()._id;
      order.metadata = {
        search_key_1 : "",
        search_key_2 : ""
      }
      order.products = this.shopping_cart
      order.status = "PENDING"
      order.payment_details = {
        type : this.payment_details
      }
      console.log(order);
      let orderData = JSON.stringify(order)
      this.purchase({orderData});
    }
  },
  computed:{
    ...mapGetters({
        shopping_cart:"shoppingCart"
      }),
    }
  }
</script>

