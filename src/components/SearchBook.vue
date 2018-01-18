<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex md6 v-for="book in books" :key="book._id">
                <v-card>
                    <v-container>
                        BookID - {{book._id}} <br>
                        {{book.created_at}} <br>
                        <router-link :to="`/create_book/${book._id}`" tag="button">
                            <img src="/static/cover/mathany_1a.jpeg" height="500px" width="100%"></img>
                        </router-link>
                        <router-link :to="`/create_book/${book._id}`" tag="button">
                            <v-btn color="primary">
                                {{$t('Edit')}}
                            </v-btn>
                        </router-link>
                        <v-btn color="error" @click.stop="deleteBook({book,callback:getBooks}); ">
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
  watch: {
    // call again the method if the route changes
    '$route': 'getBooks'
  },
  data() {
    return {
    };
  },
   methods: {
    ...mapActions([
      "deleteBook",
      "getBook"
    ]),

    getBooks() {
        let paginator = {};
            paginator.limit = this.book_paginator.limit;
            paginator.skip = (this.book_paginator.current_page-1)*this.book_paginator.limit;
        this.getBook({paginator});
    }
   },
  computed:{
        ...mapGetters({
            books: "books",
            book_paginator:"bookPaginator"
        })
  },
};    
</script>
<style scoped>

</style>
