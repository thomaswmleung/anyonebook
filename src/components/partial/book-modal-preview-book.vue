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
              <div v-if="edit1">
                <v-text-field
                  name="Edit"
                  label="Comment here"
                  v-model="cm1"
                  textarea
                  @input="changeEvent('left_comment')"
                ></v-text-field>
                <ul>
                  <li v-for="file in files1" :key="file.id">
                    <span>{{file.name}}</span>
                    <span v-if="file.error">{{file.error}}</span>
                    <span v-else-if="file.success">success</span>
                    <span v-else></span>
                  </li>
                </ul>
                <div class="upload-btn">
                  <file-upload
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    :multiple="false"
                    v-model="files1"
                    @input-filter="inputFilter"
                    ref="upload">
                    Select files
                  </file-upload>
                  <v-btn
                    v-if="!preview1"
                    color = "primary"
                    flat
                    @click.native="uploadImage(files1, 'left');">
                    Upload
                  </v-btn>
                  <img v-if="preview1" :src="url1" width="100%"/>
                </div>
              </div>
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
                  :grey="page[`left_greyscale`]"
                  side="left">
                </book-row-image>
              </v-flex>
              <v-flex xs12 sm12 md6 >
                <book-row-image
                  :all_pages="all_pages"
                  :page="page"
                  :row_height="row_height"
                  :grey="page[`right_greyscale`]"
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
              <div v-if="edit2">
                <v-text-field
                  name="Edit"
                  label="Comment here"
                  v-model="cm2"
                  textarea
                  @input="changeEvent('right_comment')"
                ></v-text-field>
                <ul>
                  <li v-for="file in files2" :key="file.id">
                    <span>{{file.name}}</span>
                  </li>
                </ul>
                <div>
                  <file-upload
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    :multiple="false"
                    v-model="files2"
                    @input-filter="inputFilter"
                    ref="upload">
                    Select files
                  </file-upload>
                  <v-btn
                    v-if="!preview2"
                    color = "primary"
                    flat
                    @click.native="uploadImage(files2, 'right');">
                    Upload
                  </v-btn>
                  <img v-if="preview2" :src="url2" width="100%"/>
                </div>
              </div>
            </v-card>
            <br>
            <v-card color="yellow lighten-4">
              <v-container>
                <table class="summary_table">
                  <tr>
                    <td class="attr">{{$t("Teacher Copy")}}</td>
                    <td class="value">{{summary.teacher_copy}}</td>
                  </tr>
                  <tr>
                   <td class="attr">{{$t("Student Copy")}}</td>
                    <td class="value">{{summary.student_copy}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("B&W Pages")}}</td>
                    <td class="value">{{summary.bw_page}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("Color Pages")}}</td>
                    <td class="value">{{summary.color_page}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("Required Edit")}}</td>
                    <td class="value">{{summary.edit_page}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("Average Price")}}</td>
                    <td class="value">HKD ${{summary.average_price}}</td>
                  </tr>
                </table>
              </v-container>
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
  table.summary_table td.attr{
    color:grey;
    font-size: 0.85em;
    text-align: left;
  }
  table.summary_table td.values{
    color:darkolivegreen;
    font-size: 0.95em;
    text-align: left;
  }
  .example-simple label.btn {
    margin-bottom: 0;
    margin-right: 1rem;
  }
  hidden{
    opacity: 0;
  }
  #file {
    overflow: hidden;
    position: fixed;
    width: 1px;
    height: 1px;
    z-index: -1;
    opacity: 0;
  }
</style>

<script>
  import Vue from 'vue'
  import {mapGetters,mapActions} from "vuex"
  import moment from 'moment'
  import { getExtension } from '@/shared/helpers'
  import BookRowImage from "@/components/partial/book-row-image"
  import jsSHA from "jssha"
  import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
  import { db }from '../../main'

  export default{
    name:"BookModalPreviewBook",
    components:{
      BookRowImage,
      FileUpload
    },
    props:["show", "row_record", "metadata", "all_pages", "grey", "summary"],
    data(){
      return{
        current_index:1,
        edit1:false,      edit2:false,
        bw1:false,        bw2:false,
        cm1:"",           cm2:"",
        row_height:550,
        files1:[],        files2:[],
        url1: "",         url2: "",
        preview1: false,  preview2: false
      }
    },
    watch: {
      // call again the method if the route changes
      'show': 'fetchData'
    },
    methods: {
      ...mapActions([
        "createBook",
        "showFullscreenLoader",
        "uploadMedia",
        "pageUploadVersion",
        "getMedia"
      ]),

      fetchData(){
        this.edit1=this.page[`left_edit`];        this.edit2=this.page[`right_edit`];
        this.bw1=this.page[`left_greyscale`];     this.bw2=this.page[`right_greyscale`];
        this.cm1=this.page[`left_comment`];       this.cm2=this.page[`right_comment`];
        this.url1=this.page[`left_url`];          this.url2=this.page[`right_url`];
        this.preview1=this.page[`left_preview`];  this.preview2=this.page[`right_preview`];
        this.files1=this.page[`left_files`];      this.files2=this.page[`right_files`]
      },

      //reset the value of the switch for every page
      resetPage(){
        this.edit1=this.row_record[this.current_index-1].left_edit;       this.edit2=this.row_record[this.current_index-1].right_edit;
        this.bw1=this.row_record[this.current_index-1].left_greyscale;    this.bw2=this.row_record[this.current_index-1].right_greyscale;
        this.cm1=this.row_record[this.current_index-1].left_comment;      this.cm2=this.row_record[this.current_index-1].right_comment;
        this.url1=this.row_record[this.current_index-1].left_url;         this.url2=this.row_record[this.current_index-1].right_url;
        this.preview1=this.row_record[this.current_index-1].left_preview; this.preview2=this.row_record[this.current_index-1].right_preview;
        this.files1=this.row_record[this.current_index-1].left_files;     this.files2=this.row_record[this.current_index-1].right_files;
      },

      //handle the value changed caused by the action
      changeEvent(attr_key){
        let value = {};
        switch(attr_key){
          case 'left_greyscale': value=this.bw1; break;     case 'right_greyscale': value=this.bw2; break;
          case 'left_edit': value=this.edit1; break;        case 'right_edit': value=this.edit2; break;
          case 'left_comment': value=this.cm1; break;       case 'right_comment': value=this.cm2; break;
          case 'left_url': value=this.url1; break;          case 'right_url': value=this.url2; break;
          case 'left_preview': value=this.preview1; break;  case 'right_preview': value=this.preview2; break;
          case 'left_files': value=this.files1; break;      case 'right_files': value=this.files2; break;
        }
        //emit an event to CreateBook to handle the changes
        this.$emit("changeRowValue", {current_index:this.current_index-1, attr:attr_key, value});
      },

      processBook(){
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

        this.createBook({book})
        .then(response=>{
          //hide loading
          _instance.showFullscreenLoader(false);
          _instance.$router.push(`/create_book/${book._id}`);
          _instance.$emit("close_dialog");
        },error=>{
          // Vue.toasted(_instance.$t('Fail to create Book Record'));
          console.log(error);
          _instance.showFullscreenLoader(false);
        })
      },

      inputFilter(newFile, oldFile, prevent){
        if (newFile && !oldFile){
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)){
            return prevent()
          }
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)){
            return prevent()
          }
        }
      },

      uploadImage(files, where){
        let formData = new FormData();
        formData.append('media_file',files[0].file)
        let data = {
          queryString: {
            type: files[0].type,
            extension: getExtension(files[0].name),
            usage: [files[0].id],
            remark: [],
            tag: []
          },
          formData
        }
        this.uploadMedia({
          payload: {data},
          callback:()=>{
            if(where == 'left')
            {
              this.url1 = this.currentMedia.url
              this.preview1 = true
              this.changeEvent('left_files')
              this.changeEvent('left_url')
              this.changeEvent('left_preview')
            }
            else{
              this.url2 = this.currentMedia.url
              this.preview2 = true
              this.changeEvent('right_files')
              this.changeEvent('right_url')
              this.changeEvent('right_preview')
            };
          }
        });
      }
    },
    computed:{
      ...mapGetters({
        all_page:"allPages",
        user_data: "userData",
        current_book:"currentBook",
        currentMedia: "currentMedia"
      }),
      page(){
        return this.row_record[this.current_index-1]||{};
      },
    }
  };
</script>

