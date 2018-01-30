<template>
  <v-dialog v-model="show" persistent max-width="1500px" >
      <v-container fluid text-xs-center style="background-color:#ffffff;">
        <v-layout row wrap>
          <v-flex md3 v-for="book in books_record" :key="book._id">
                <v-card>
                    <v-container>
                        <v-layout row wrap >
                            <v-flex xs12>
                                <div >
                                    <span style="font-weight: bold; font-size: 1em;">
                                        {{book.metadata.title}}
                                    </span><br>
                                    {{getOptionLabel({code:book.metadata.codex,type:"codex" })}}
                                    ( {{book.metadata.grade}} ) <br>
                                </div>
                                <div>
                                    <!-- <router-link :to="`/create_book/${book._id}`" tag="button"> -->
                                        <img :src="getCoverImage(book.metadata)" height="200px" />
                                    <!-- </router-link> -->
                                </div>
                                <div>
                                    <v-text-field
                                        label="Quantity"
                                        v-model="book.quantity"
                                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                                        @input="validation($event, book)"
                                    ></v-text-field>
                                    <v-btn small color="error" @click.stop = "deleteShoppingCart({id:book._id}); reset()">
                                        {{$t('Delete')}}
                                    </v-btn>
                                </div>
                                <div style="color: darkgrey">
                                    {{book.created_at}}
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-container text-xs-centre>
            Total Price: HKD ${{totalPrice}}<br>
          </v-container>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs4 md3>
                <v-select
                  :items="payment_items"
                  v-model="payment_details"
                  label="Payment"
                  autocomplete
                  required
                  :rules="[v => !!v || 'Item is required']"
                ></v-select>
              </v-flex>
              <v-flex xs2 md2>
              </v-flex>
              <v-flex xs4 md3>
                <v-select
                  :items="delivery_items"
                  v-model="delivery_details"
                  label="Delivery"
                  autocomplete
                  required
                  :rules="[v => !!v || 'Item is required']"
                ></v-select>
              </v-flex>
              <v-flex xs2 md4>
                <v-btn color="blue darken-1" flat 
                  @click.stop = "processOrder();"
                  :disabled="!valid">
                  {{$t("Purchase")}}
                </v-btn>
              </v-flex>
              <v-flex xs4 md3>
                <v-text-field
                  label = "Address"
                  v-model="address"
                  required
                  :rules="[v => !!v || 'Item is required']"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
              </v-flex>
              <v-flex xs4 md3>
                <v-text-field
                  label = "Remarks"
                  v-model="remarks"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 md4>
                <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');">
                  {{$t("Close")}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
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
  import { getUser } from '@/shared/auth-service'

  export default{
    name:"OrderFormModal",
    components:{
      
    },
    props:["show"],
    mounted()
    {
    },
    data(){
      return{
        valid: true,
        payment_details:"",
        payment_items:["Cash", "Credit Card", "Cheque"],
        delivery_details:"",
        delivery_items:["Option1", "Option2"],
        books_record:[],
        totalPrice:0,
        address: "",
        remarks: ""
      }
    }, 
    watch: {
      "show" : "reset"
    },
    methods: {
      ...mapActions([
        "purchase",
        "getBookById",
        "deleteShoppingCart",
        "updateQuantity"
      ]),
      processOrder()
      {
        if (this.$refs.form.validate() && this.shopping_cart.length!=0) {
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
          this.$emit('close_dialog');
        }
      },
      reset()
      {
        let id = "";
        let i = 0;
        this.books_record={};
        this.totalPrice = 0;
        if (this.shopping_cart.length==0) {
          this.valid = false;
        }
        for (i in this.shopping_cart)
        {
          id = this.shopping_cart[i].book_id;
          this.totalPrice = this.totalPrice + this.shopping_cart[i].book_qty*this.shopping_cart[i].book_price
          this.books_record[id]=_.cloneDeep(this.OrderBooks[id]);
          this.books_record[id].quantity = _.cloneDeep(this.shopping_cart[i].book_qty)
        }
      },
      getOptionLabel({type,code}){
          return _.find(this.option[type],{code})["label"]
      },
      getCoverImage(book_metadata){
          return `static/cover/${book_metadata.codex}_${book_metadata.grade.toLocaleLowerCase().slice(1,3)}.jpeg`;
      },
      validation(input, book){
        if (input=="" || input=="0") {
            book.quantity = 1;
        } else {
            book.quantity = input?parseInt(input, 10):1
        }
        this.updateQuantity({book, quantity: book.quantity});
        this.reset()
        console.log(book.quantity)
      }
    },
    computed:{
      ...mapGetters({
          shopping_cart:"shoppingCart",
          current_book:"currentBook",
          option:"PageSyllabusOptions",
          OrderBooks:"OrderBooks"
        }),
      }
    }
</script>

