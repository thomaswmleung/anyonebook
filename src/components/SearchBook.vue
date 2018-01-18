<template>
    <v-container grid-list-md >
        <v-layout row wrap text-xs-center>
            <v-flex md3 v-for="book in books" :key="book._id">
                <v-card>
                    <v-container>
                        <v-layout row wrap >
                            <v-flex xs12>
                                BookID - {{book._id}} <br>
                                <router-link :to="`/create_book/${book._id}`" tag="button">
                                    <img src="/static/cover/mathany_1a.jpeg" height="200px" />
                                </router-link>
                                <router-link :to="`/create_book/${book._id}`" tag="button">
                                    <v-btn small color="primary" >
                                        {{$t('Edit')}}
                                    </v-btn>
                                </router-link>
                                <v-btn small color="error" 
                                    @click.stop="deleteBook({book,callback:getBooks}); ">
                                    {{$t('Delete')}}
                                </v-btn><br>
                                {{book.created_at}}
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap text-xs-center>
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
