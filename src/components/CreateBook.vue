<template>
    <v-container grid-list-md text-xs-center >

        <v-layout row wrap>
            <v-flex md3>
                <h2>{{$t(current_book._id==""?"Create Blank New Book":"Edit Existing Book")}}</h2>
                <span v-if="current_book._id!=''">
                    BookID - {{current_book._id}}
                </span>
                 <!-- Preview -->
                 <v-layout row wrap>
                        <v-flex xs12 >
                            <v-select :items="option.codex" class="compact"
                                        item-value="code"
                                        item-text="label"
                                        v-model="current_page.codex"
                                        @input="updateCodex($event, 'option')"
                                        :label="$t('Codex')" editable ></v-select>
                            </v-flex>
                                <v-flex xs12 >
                                    <v-select :items="option.syllabus" class="compact"
                                              item-value="code"
                                              item-text="label"
                                              v-model="current_page.syllabus_code"
                                              @input="pageUpdateOption({type:'syllabus_code',values:$event})"
                                              :label="$t('Syllabus')" editable ></v-select>
                                </v-flex>
                                <v-flex xs12 >
                                    <v-select :items="option.domain" class="compact"
                                              v-model="current_page.domain"
                                              @input="pageUpdateOption({type:'domain',values:$event})"
                                              :label="$t('Domain')" editable ></v-select>
                                </v-flex>

                                <v-flex xs12 ><v-select :items="option.area" class="compact"
                                v-model="current_page.area"
                                              @input="pageUpdateOption({type:'area',values:$event})"
                                              :label="$t('Area')" editable ></v-select>
                                </v-flex>

                                <v-flex xs12 ><v-select :items="option.knowledge_unit" class="compact"
                                v-model="current_page.knowledge_unit"
                                              @input="pageUpdateOption({type:'knowledge_unit',values:$event})"
                                              :label="$t('Knowledge Unit')" editable ></v-select>
                                </v-flex>
                                <v-flex>
                                    <v-btn color="primary" @click.stop="addAreaRow">{{$t("Add Page")}}</v-btn>
                                    <v-btn outline color="indigo" @click.stop="show_preview_book=true;">preview</v-btn>
                                </v-flex>

                                <v-flex>
                                    <img :src="cover_image" width="100%" alt="">
                                </v-flex>

                 </v-layout>

            </v-flex>
            <v-flex x12 class="title"  v-if="area_rows.length==0">
                <v-card >
                    <v-card-text class="px-0">{{$t("Please Add Your Row")}}</v-card-text>
                </v-card>
            </v-flex>
             <v-flex xs12 md9>
                        <v-layout row wrap
                                  style="padding-left: 1.3em;border: 1px solid lightskyblue;"
                                  v-if="area_rows.length!=0">
                            <!-- TODO MetaData form  -->
                            <v-flex xs6 md2>
                                <v-select :items="option.codex" class="compact"
                                    item-value="code"
                                    item-text="label"
                                    v-model="book_metadata.codex"
                                    @input="updateCodex($event,'book')"
                                    :label="$t('Codex')"
                                ></v-select>
                            </v-flex>
                            <v-flex xs2 md1>
                                <v-select
                                    v-bind:items="grade_items"
                                    v-model="book_metadata.grade"
                                    label="Grade"
                                    @input="updateCoverImage"
                                    single-line
                                ></v-select>
                            </v-flex>
                            <v-flex xs6 md2>
                                <v-text-field
                                    label="School Name"
                                    v-model="book_metadata.school_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6 md2>
                                <v-text-field
                                    label="School Logo"
                                    v-model="book_metadata.school_logo"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6 md2>
                                <v-text-field
                                    label="Book Title"
                                    v-model="book_metadata.title"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6 md2>
                                <v-text-field
                                    label="Book Subtitle"
                                    v-model="book_metadata.subtitle"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6 md2>
                                <v-select
                                    v-bind:items = "publicity_items"
                                    v-model="book_metadata.publicity"
                                    label="Publicity"
                                    single-line
                                ></v-select>
                            </v-flex>
                            <v-flex xs2 md2>
                                <v-text-field
                                    label="Student Copy"
                                    v-model="book_metadata.student_copy"
                                    @input="validation($event,'student_copy')"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2 md2>
                                <v-text-field
                                    label="Teacher Copy"
                                    v-model="book_metadata.teacher_copy"
                                    @input="validation($event,'teacher_copy')"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6 md8>
                                <v-text-field
                                    label="Remarks"
                                    v-model="book_metadata.remark"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-container  id="dragContainer" class="rowContainer toc" >
                          <v-layout row wrap
                                v-for="(page,index) in area_rows"
                                :key="index+page.domain+page.area+page.ku"
                                :data="page"
                                :id="`${index}`"
                                class="rowItem toc">
                              <v-flex xs12  >
                                        <v-layout row wrap @click.stop="updatePageRecord(index,'tools')" >
                                            <v-flex xs4  >
                                                <h3 class="title mb-1">{{page.area}} </h3>
                                                <span >{{page.domain}}</span>
                                            </v-flex>
                                            <v-flex xs4  >
                                                <h3 class="subtitle mb-1">{{page.ku}} </h3>
                                            </v-flex>
                                            <v-flex xs4 text-xs-right >
                                                <h3 class="content mb-1">
                                                    <div  v-if="!page.tools">{{(index+1)*2}} </div>
                                                        <div  v-if="page.tools">
                                                            {{(index+1)*2}}
                                                            <v-btn  fab dark small color="primary"
                                                                @click.stop="updatePageRecord(index,'preview')">
                                                                <v-icon dark>remove_red_eye</v-icon>
                                                            </v-btn>
                                                            <v-btn  fab dark small color="error"
                                                                @click.stop="confirmDelete(index)">
                                                                <v-icon  @click.stop="updatePageRecord(index,'tools')" >delete</v-icon>
                                                            </v-btn>
                                                            <v-icon class="handle">drag_handle</v-icon>
                                                        </div>
                                                </h3>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap  :style="{height:page.preview?`${row_height}px`:'0px',overflow:'scroll'}" >
                                                <v-flex xs12 sm12 md6 class="left_image"  >
                                                    <book-row-image
                                                        :all_pages="all_pages"
                                                        :page="page"
                                                        :row_height="row_height"
                                                        :grey="page.left_greyscale"
                                                        :current_index="index"
                                                        @changeRowValue="changeRowValue"
                                                        side="left">
                                                    </book-row-image>
                                                </v-flex>
                                                <v-flex xs12 sm12 md6 >
                                                    <book-row-image
                                                        :all_pages="all_pages"
                                                        :page="page"
                                                        :row_height="row_height"
                                                        :grey="page.right_greyscale"
                                                        :current_index="index"
                                                        @changeRowValue="changeRowValue"
                                                        side="right">
                                                    </book-row-image>
                                                </v-flex>
                                        </v-layout>
                              </v-flex>
                          </v-layout>
                       </v-container>
            </v-flex>
        </v-layout>
        <book-modal-preview-book
            :show="show_preview_book"
            :row_record="area_rows"
            :metadata="book_metadata"
            :summary="summary"
            :all_pages="all_pages"
            @close_dialog = "show_preview_book=false"
            @changeRowValue="changeRowValue"
           >

        </book-modal-preview-book>
     </v-container>
</template>
<style scoped>
    li.complete {
        background: #DDD;
    }
    .rowItem.toc{
        border:lightgrey 1px solid
    }
    .compact{
        margin-bottom: -2.2em;
    }
</style>

<script>
import Vue from 'vue';
import {mapGetters,mapActions} from "vuex";
import { Http,ApiPrivateHttp } from '@/shared/http-service'
import {checkImageExists} from "@/util"
// import {syllabus} from "@/store/static-record";
import _ from "lodash";

import BookModalPreviewBook from "@/components/partial/book-modal-preview-book"
import BookRowImage from "@/components/partial/book-row-image"

 export default {
  name: 'Pagination',
  components:{
      BookModalPreviewBook,
      BookRowImage,
    },
  methods: {
      ...mapActions([
           "pageUpdateOption",
           "getBookById",
           "resetBook"
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
        this.initialize();

    },
    //Update Codex
    updateCodex(codex, updateWhich){
        let codexInstance = _.find(this.option.codex, {code:codex});
        this.pageUpdateOption({type:'codex',values:codex})
        this.pageUpdateOption({type:'syllabus_code',values:codexInstance.syllabus})

        updateWhich=='book'?this.current_page.codex = this.book_metadata.codex:
                            this.book_metadata.codex = this.current_page.codex;
        this.updateCoverImage();
    },
    updateCoverImage(){
      //Show Image if the image is exist
        this.show_cover_image = false;
        this.cover_image = `static/cover/${this.book_metadata.codex}_${this.book_metadata.grade.toLocaleLowerCase().slice(1,3)}.jpeg`;
        checkImageExists({imageUrl:this.cover_image, callBack:flag=>{
          if(flag){
            this.show_cover_image= true;
          }else{
            this.show_cover_image= false;
            //this.cover_image="";
          }
        }});
    },
    //Add Area Row
    addAreaRow(){
      this.area_rows.push({
            domain:this.current_page.domain,
            area:this.current_page.area,
            ku:this.current_page.knowledge_unit,
            left_index:0,
            left_page_obj:{},
            right_index:1,
            right_page_obj:{},
            preview:false,
            tools:false,
            left_greyscale:false,
            left_comment:"",
            right_greyscale:false,
            right_comment:"",
            left_edit:false,
            right_edit:false
        });
    },

     handleDragEvent(event) {
          console.log(event.detail.to.container);
          let dragItemIndex = event.detail.draggedElement.id.split(/-+/).pop();
          this.area_rows.splice(
              event.detail.to.index,
              0,
              this.area_rows.splice(dragItemIndex,1)[0]);
     },
      updatePageRecord(index,attribute){
          console.log(index, attribute);
          this.area_rows.forEach(page=>{page["preview"]=false;page[attribute]=false;});
          this.area_rows[index][attribute]= true;
      },
      confirmDelete(index){
        if( confirm(this.$t('confirm_remove_page',{
                                    domain:this.area_rows[index]['domain'],
                                    area:this.area_rows[index]['area'],
                                    page:(index+1)*2
                                }))
        ){
            this.area_rows.splice(index,1);
        };
      },
      updateBookSummary(){
        let count = 0;
        let i = 0 ;
        let rows = this.area_rows;
        this.summary = {
            student_copy:0,
            teacher_copy:0,
            bw_page:0,
            color_page:0,
            edit_page:0,
            average_price:44
          }
        for(i =0;i< rows.length;i++){
            this.summary.bw_page +=rows[i]["left_greyscale"]?1:0;
            this.summary.bw_page +=rows[i]["right_greyscale"]?1:0;
            this.summary.color_page +=rows[i]["left_greyscale"]?0:1;
            this.summary.color_page +=rows[i]["right_greyscale"]?0:1;
            this.summary.edit_page +=rows[i]["left_edit"]?1:0;
            this.summary.edit_page +=rows[i]["right_edit"]?1:0;
        }
        this.summary.student_copy = this.book_metadata.student_copy;
        this.summary.teacher_copy = this.book_metadata.teacher_copy;

        let total_cost = _.min([60, this.summary.color_page*0.5+44])
                          * this.summary.student_copy
                          +this.summary.edit_page*70
                          +60*this.summary.teacher_copy;
        this.summary.average_price = _.ceil(total_cost / this.summary.student_copy);

      },
      //handle the data changed passed from BookModalPreviewBook
      changeRowValue({current_index, attr, value}){
          this.area_rows[current_index][attr] = value;
          //Update Summary of the Book
          this.updateBookSummary();
      },
      initialize(){
          if(this.$route.params.id){
            this.getBookById({
                id:this.$route.params.id,
                callback:()=>{
                    this.area_rows = _.cloneDeep(this.current_book.row_record);
                    this.book_metadata = _.cloneDeep(this.current_book.metadata);
                    this.updateCoverImage();
                    this.updateBookSummary();
                }
            })
          }else{
            //reset current_book
            this.resetBook();
          }
      },
      validation(inputText, type){
        for (var i = 0; i < inputText.length; i++) {
          inputText[i].replace(/[\D\s\._\-]+/g, '');
        }
          inputText = inputText?parseInt( inputText, 10 ):0;
          if(inputText>=0){
              this.book_metadata.type = inputText;
          }else{
              this.book_metadata.type = 0;
          }
        this.updateBookSummary();
     }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  data() {
    return {
        show_preview_book:false,
        codex:"",
        all_pages:[],
        area_rows:[], //domain, area

        row_height:450,

        cover_image:"",
        show_cover_image:false,

        book_metadata:{
            codex:"",
            grade:"",
            title:"",
            subtitle:"",
            school_name:"",
            school_logo:"",
            pulicity:"",
            remark:"",
            student_copy:1,
            teacher_copy:1
        },
          summary:{
            student_copy:0,
            teacher_copy:0,
            bw_page:0,
            color_page:0,
            edit_page:0,
            average_price:44
          }
    };
  },
  mounted(){
    //update all page record
    lmdd.set(document.getElementById('dragContainer'), {
      containerClass: 'rowContainer',
      draggableItemClass: 'rowItem',
      handleClass: 'handle',
      dataMode: true
    });
    this.$el.addEventListener('lmddend', this.handleDragEvent);
    this.fetchData();
  },
   computed:{
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",
            current_book:"currentBook",
            grade_items:"gradeItem",
            publicity_items:"publicityItem"
        })
  }
};
</script>
