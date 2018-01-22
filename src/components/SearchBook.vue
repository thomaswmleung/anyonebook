<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4 md2>
                <v-select :items="option.codex"
                    item-value="code"
                    item-text="label"
                    v-model="filter.codex"
                    :label="$t('Codex')"
                    autocomplete
                ></v-select>
            </v-flex>
            <v-flex xs1 md1>
                <v-select
                    :items="grade_items"
                    v-model="filter.grade"
                    label="Grade"
                    autocomplete
                ></v-select>
            </v-flex>
            <v-flex xs2 md1>
                <v-btn  color="primary" fab small dark>
                  <v-icon>search</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap text-xs-center>
            <v-flex md3 v-for="book in books" :key="book._id">
                <v-card>
                    <v-container>
                        <v-layout row wrap >
                            <v-flex xs12>
                                <div >
                                    <span style="font-weight: bold; font-size: 1.5em;">
                                        {{book.metadata.title}}
                                    </span><br>
                                    {{getOptionLabel({code:book.metadata.codex,type:"codex" })}}
                                    ( {{book.metadata.grade}} ) <br>
                                </div>
                                <div>
                                    <router-link :to="`/create_book/${book._id}`" tag="button">
                                        <img src="static/cover/mathany_1a.jpeg" height="200px" />
                                    </router-link>
                                </div>
                                <div>
                                    <router-link :to="`/create_book/${book._id}`" tag="button">
                                        <v-btn small color="primary" >
                                            {{$t('Edit')}}
                                        </v-btn>
                                    </router-link>
                                    <v-btn small color="error"
                                        @click.stop="deleteBook({book,callback:getBooks}); ">
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
        filter:{
            codex:"",
            grade:""
        }
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
    },

    getOptionLabel({type,code}){
        return _.find(this.option[type],{code})["label"]
    }
   },
  computed:{
        ...mapGetters({
            books: "books",
            book_paginator:"bookPaginator",
            option:"PageSyllabusOptions",
            current_book:"currentBook",
            grade_items:"gradeItem",
            publicity_items:"publicityItem"
        })
  },
};
</script>
<style scoped>

</style>
