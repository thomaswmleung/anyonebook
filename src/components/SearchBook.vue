<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex md6 v-for="book in books" :key="book._id">
                <v-card>
                    <v-container>
                        BookID - {{book._id}} <br>
                        {{book.created_at}} <br>
                        <v-card-media src="/static/cover/mathany_1a.jpeg" height="500px">
                        </v-card-media>
                        <router-link :to="`/create_book/${book._id}`" tag="button">
                            <v-btn color="primary">
                                {{$t('Edit')}}
                            </v-btn>
                        </router-link>
                        <v-btn color="blue darken-1" flat @click.native="deleteBook({book})">
                            {{$t('Delete')}}
                        </v-btn>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap >
                     <v-flex>
                        <v-pagination 
                        :length="Math.ceil(book_paginator.total_count/book_paginator.limit)" 
                        v-model="book_paginator.current_page" 
                        @input="getBooks"
                        ></v-pagination>
                        (Total Record:  {{book_paginator.total_count}})
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
  name: 'Pagination',
  created () {
       this.getBooks();
  },
  data() {
    return {
        book_paginator:{
            total_count:4,
            limit:10,
            current_page:0
        }
    };
  },
   methods: {
    ...mapActions([
      "deleteBook",
      "getBook"
    ]),

    deleteBooks()
    {
        let book = {};
        book._id = "5a5db2ec759b745c0755dca2";
        this.deleteBook({book});
    },
    getBooks() {
        let paginator = {};
            paginator.limit = 10;
            paginator.skip =0;
        this.getBook({paginator});
    }
   },
  computed:{
        ...mapGetters({
            books: "books"
        })
  },
};    
</script>
<style scoped>

</style>
