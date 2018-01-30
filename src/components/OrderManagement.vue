<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex  v-for="order in all_orders" :key="order._id">
                <v-layout row wrap>
                    <v-flex xs4 md5>
                        Order ID - {{order._id}}<br>
                        Created at: {{order.created_at}}<br>
                    </v-flex>
                    <v-flex xs4 md5>
                        Status: {{order.status}}<br>
                        Payment: {{order.payment_details.type}}
                    </v-flex>
                    <v-flex xs4 md2>
                        <v-btn v-if="order.status == 'PENDING'"
                            small color="error"
                            @click.stop="deleteOrder({id: order._id, callback: getOrder})">
                            {{$t('Delete')}}
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-data-table v-bind:headers="headers" :items="order.products" hide-actions>
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.book_title }}</td>
                    <td class="text-xs-right">{{ props.item.book_price }}</td>
                    <td class="text-xs-right">{{ props.item.book_qty }}</td>
                    <td class="text-xs-right">{{ props.item.discount_percentage }}</td>
                    <td class="text-xs-right">{{ props.item.book_qty*props.item.book_price*(1-props.item.discount_percentage/100)}}</td>
                    </template>
                </v-data-table>
                <br>
            </v-flex>
        </v-layout>
     </v-container>
</template>
<style scoped>
    li.complete {
        background: #DDD;
    }
</style>

<script>
 import Vue from 'vue';
 import {mapGetters,mapActions} from "vuex"
 import moment from 'moment'
 export default {
  name: 'OrderManagement',
  created()
  {
      this.getOrder();
  },
  data() {
    return {
        headers: [
          { text: 'Ordered Book', align: 'left', value: 'title' },
          { text: 'Unit Price($)', value: 'price' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Discount(%)', value: 'discount_percentage' },
          { text: 'Total Price($)', value: 'total_price' }
        ]
    };
  },
  methods: {
    ...mapActions([
      "getOrder",
      "deleteOrder"
    ]),
  },
  computed:{
        ...mapGetters({
            all_orders: "allOrders",
        })
  }
};    
</script>
<style scoped>

</style>
