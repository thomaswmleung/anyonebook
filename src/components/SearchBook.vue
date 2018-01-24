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
            <v-flex xs6 md3>
                <v-text-field
                    label="School Name"
                    v-model="filter.school_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs4 md2>
                <v-select
                    :items="publicity_items"
                    v-model="filter.publicity"
                    label="Publicity"
                    autocomplete
                ></v-select>
            </v-flex>
            <v-flex xs2 md1>
                <v-btn  color="primary" fab small dark @click.stop = "getBooks()">
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
                                        <img :src="getCoverImage(book.metadata)" height="200px" />
                                    </router-link>
                                </div>
                                <div>
                                    <v-btn small color="primary" flat @click.stop="purchaseBook(book._id)">
                                        {{$t('Purchase')}}
                                    </v-btn>
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
        <book-modal-purchase-book
            :show="show_purchase_book"
            :all_pages="all_pages"
            :row_record="area_rows"
            :metadata="book_metadata"
            @close_dialog = "show_purchase_book=false"
        ></book-modal-purchase-book>
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
 import { Http,ApiPrivateHttp } from '@/shared/http-service'
 import BookModalPurchaseBook from "@/components/partial/book-modal-purchase-book"

 export default {
  name: 'Pagination',
  components:{
      BookModalPurchaseBook
  },
  created () {
       this.getBooks();
       this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getBooks'
  },
  data() {
    return {
        filter:{
            codex:"",
            grade:"",
            publicity:"Private",
            school_name:""
        },
        show_purchase_book:false,
        all_pages:[],
        area_rows:[],
        book_metadata:{}
    };
  },
   methods: {
    ...mapActions([
      "deleteBook",
      "getBook",
      "getBookById"
    ]),
        getPageTsv(){
        let page_file_name = "page-rows";
        return new Promise((resolve,reject)=>{
            Http({
                methods:"get",
                url: `static/${page_file_name}.tsv`,
            }).then(response=>{
                let items=[];
                    let fields = ["file_path", "codex", "syllabus_code", "domain", "area", "knowledge_unit", "learning_objective", "particular", "level_of _difficulty", "copyright_content", "copyright_artwork", "copyright_photo", "linkage", "user", "level", "nature", "position", "output"];
                    let rowArray = response.split('\n');
                    rowArray.forEach(row=>{
                        let obj = {};
                        let attrs = row.split('\t');
                        fields.forEach((str,idx)=>{
                            obj[str] = attrs[idx];
                        })
                        items.push(obj);
                    });
                resolve(items);
            });
        })
    },
    //FetchData
    fetchData(){
        //Get demo page array
        this.getPageTsv().then(list=>this.all_pages=list);

    },
    getBooks() {
        let paginator = {};
            paginator.limit = this.book_paginator.limit;
            paginator.skip = (this.book_paginator.current_page-1)*this.book_paginator.limit;
        let book_filter = {};
            book_filter.codex = this.filter.codex;
            book_filter.grade = this.filter.grade;
            book_filter.publicity = this.filter.publicity;
            book_filter.school_name = this.filter.school_name;
        this.getBook({paginator, book_filter});
    },

    getOptionLabel({type,code}){
        return _.find(this.option[type],{code})["label"]
    },
      getCoverImage(book_metadata){
        return `static/cover/${book_metadata.codex}_${book_metadata.grade.toLocaleLowerCase().slice(1,3)}.jpeg`;
    },
    purchaseBook(id)
    {
        this.getBookById({
            id,
            callback:()=>{
                this.area_rows = _.cloneDeep(this.current_book.row_record);
                this.book_metadata = _.cloneDeep(this.current_book.metadata);
                // this.updateCoverImage();
                // this.updateBookSummary();
            }
        });
        this.show_purchase_book=true;
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
