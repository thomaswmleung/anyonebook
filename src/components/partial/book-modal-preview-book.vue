<template>
  <v-dialog v-model="show" persistent max-width="1500px" >
      <v-container fluid text-xs-center style="background-color:#ffffff;">
        <v-layout row wrap>
          <v-flex xs2>
            <!-- Create a card for control button for the left image of the row -->
                <!-- Edit by adding comment and control the color -->
            <v-card>
              <v-switch
                :label="edit1?$t('Edit'):$t('No Edit')"
                v-model="edit1"
                @change="changeEvent('left_edit')"
              ></v-switch>
              <v-switch
                :label="bw1?$t('Black/White'):$t('Color')"
                v-model="bw1"
                @change="changeEvent('left_greyscale')"
              ></v-switch>
              <v-text-field
                v-if="edit1"
                name="Edit"
                label="Comment here"
                v-model="cm1"
                textarea
                @input="changeEvent('left_comment')"
              ></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs8>
            <!-- Create a card for displaying the image of the row -->
            <v-layout row wrap >
              <v-flex xs12 sm12 md6 class="left_image"  >
                <book-row-image
                  :all_pages="all_pages"
                  :page="page"
                  :row_height="row_height"
                  :grey="bw1"
                  side="left">
                </book-row-image>
              </v-flex>
              <v-flex xs12 sm12 md6 >
                <book-row-image
                  :all_pages="all_pages"
                  :page="page"
                  :row_height="row_height"
                  :grey="bw2"
                  side="right">
                </book-row-image>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs2>
            <!-- Create a card for control button for the right image of the row -->
                <!-- Edit by adding comment and control the color -->
            <v-card>
              <v-switch
                :label="edit2?$t('Edit'):$t('No Edit')"
                v-model="edit2"
                @change="changeEvent('right_edit')"
              ></v-switch>
              <v-switch
                :label="bw2?$t('Black/White'):$t('Color')"
                v-model="bw2"
                @change="changeEvent('right_greyscale')"
              ></v-switch>
              <v-text-field
                v-if="edit2"
                name="Edit"
                label="Comment here"
                v-model="cm2"
                textarea
                @input="changeEvent('right_comment')"
                ></v-text-field>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap >
          <v-flex md8>
            <v-pagination
                 :length="Math.ceil(row_record.length)"
                 v-model="current_index"
                 :total-visible="7"
                 @input = "resetPage()"
            ></v-pagination>
            (Total Record:  {{row_record.length}})
          </v-flex>
          <v-flex md4>
            <v-btn color="blue darken-1" flat @click.native="processBook">
            {{$t('Save')}}
          </v-btn>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');">
            {{$t("Close")}}
          </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
  </v-dialog>
</template>
<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
<script>
  import Vue from 'vue'
  import {mapGetters,mapActions} from "vuex"
  import moment from 'moment'
  import { getExtension } from '@/shared/helpers'

  import BookRowImage from "@/components/partial/book-row-image"
  import jsSHA from "jssha"

  export default{
      name:"BookModalPreviewBook",
      components:{
        BookRowImage
      },
      props:["show","row_record","metadata","all_pages", "grey"],
      data(){
        return{
          current_index:1,
          edit1:false,
          edit2:false,
          bw1:false,
          bw2:false,
          cm1:"",
          cm2:"",
          row_height:500
        }
      },
  methods: {
    ...mapActions([
      "createBook",
      "showFullscreenLoader"
    ]),
    //reset the value of the switch for every page
    resetPage()
      {
          this.edit1=this.row_record[this.current_index-1].left_edit;
          this.edit2=this.row_record[this.current_index-1].right_edit;
          this.bw1=this.row_record[this.current_index-1].left_greyscale;
          this.bw2=this.row_record[this.current_index-1].right_greyscale;
          this.cm1=this.row_record[this.current_index-1].left_comment;
          this.cm2=this.row_record[this.current_index-1].right_comment;
      },
    //handle the value changed caused by the action
     changeEvent(attr_key)
      {
         let value = {};
         switch(attr_key){
           case 'left_greyscale': value=this.bw1; break;
           case 'right_greyscale': value=this.bw2; break;
           case 'left_edit': value=this.edit1; break;
           case 'right_edit': value=this.edit2; break;
           case 'left_comment': value=this.cm1; break;
           case 'right_comment': value=this.cm2; break;
         }
         //emit an event to CreateBook to handle the changes
          this.$emit("changeRowValue", {current_index:this.current_index-1, attr:attr_key, value});
      },
      processBook()
      {
        let _instance = this;
        let book = {};
        book._id = this.current_book._id=""?"":this.current_book._id;
        book.metadata = this.metadata;
        book.content = JSON.stringify({
                                        row_pages: this.row_record, // from CreatBook component
                                        book_metadata: this.metadata // from CreatBook component
                                      });
        let shaObj = new jsSHA('SHA-256', "TEXT");
        shaObj.update(book.content);
        shaObj.update(Date());
        book.page_code = `${this.user_data._id}-${shaObj.getHash("B64")}` ; //user id from getters , hash obj return a set of string
        // book.title = "title";
        // book.subtitle = "subtitle";
        // book.codex_id = "codexid";
        // book.author = "author";
        // book.published_year = 2017;
        // book.publisher = "publisher";
        // book.isbn = "isbn";
        // book.price = 100;
        // book.page = [];
        // book.toc = this.row_record;
        // book.cover = {};
        // book.syllabus = {};
        // book.keyword = [];
        // book.organisation = "organization";

        this.createBook({book}).then(
          response=>{
            //hide loading
            _instance.showFullscreenLoader(false);
            _instance.$router.push(`/create_book/${book._id}`);
            _instance.$emit("close_dialog");
          },
          error=>{
            // Vue.toasted(_instance.$t('Fail to create Book Record'));
            console.log(error);
            _instance.showFullscreenLoader(false);
          }
        )
      }
    },
  computed:{
    ...mapGetters({
        all_page:"allPages",
        user_data: "userData",
        current_book:"currentBook"
      }),
    page(){
        return this.row_record[this.current_index-1]||{};
      }
    }
  };
</script>

