<template>
    <v-container grid-list-md text-xs-center id="dragContainer">
        <v-layout row wrap>
            <v-flex md3>
                <h2>Create Blank New Book / From Existing Book</h2>
                 <!-- Preview -->
                 <v-layout row wrap>
                        <v-flex xs12 >
                            <v-select :items="option.codex"
                                        item-value="code"
                                        item-text="label"
                                        v-model="current_page.codex"
                                        @input="updateCodex($event)"
                                        :label="$t('Codex')" editable ></v-select>
                            </v-flex>
                                <v-flex xs12 >
                                    <v-select :items="option.syllabus"
                                              item-value="code"
                                              item-text="label"
                                              v-model="current_page.syllabus_code"
                                              @input="pageUpdateOption({type:'syllabus_code',values:$event})"
                                              :label="$t('Syllabus')" editable ></v-select>
                                </v-flex>
                                <v-flex xs12 >
                                    <v-select :items="option.domain"
                                              v-model="current_page.domain"
                                              @input="pageUpdateOption({type:'domain',values:$event})"
                                              :label="$t('Domain')" editable ></v-select>
                                </v-flex>

                                <v-flex xs12 ><v-select :items="option.area"
                                v-model="current_page.area"
                                              @input="pageUpdateOption({type:'area',values:$event})"
                                              :label="$t('Area')" editable ></v-select>
                                </v-flex>

                                <v-flex xs12 ><v-select :items="option.knowledge_unit"
                                v-model="current_page.knowledge_unit"
                                              @input="pageUpdateOption({type:'knowledge_unit',values:$event})"
                                              :label="$t('Knowledge Unit')" editable ></v-select>
                                </v-flex>  
                                <v-flex>
                                    <v-btn color="primary" @click.stop="addAreaRow">{{$t("Add Page")}}</v-btn>
                                </v-flex>                      
                
                 </v-layout>
                 <!-- Codex List -->
                <v-btn outline color="indigo" @click.stop="show_preview_book=true;">preview</v-btn>
                 <v-flex v-for="row in all_pages" :key="row.file_path">
                     <!-- {{row.domain}} - {{row.area}} -->
                     <!-- <img style="width=95%" :src="row.file_path"/> -->
                </v-flex> 

            </v-flex>
             <v-flex xs12 md9 class="rowContainer toc" id="toc" > 
                       <v-layout row wrap v-if="area_rows.length==0">
                           <v-flex xs12 class="title " >
                               <v-card >
                                <v-card-text class="px-0">{{$t("Please Add Your Row")}}</v-card-text>
                              </v-card>
                               
                           </v-flex>
                       </v-layout>
                       <v-layout row wrap 
                            v-for="(page,index) in area_rows" 
                            :key="page.domain+page.area+page.knowledge_unit" 
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
                                     <v-layout row wrap  :style="{height:page.preview?'450px':'0px',overflow:'scroll'}" >

                                            <v-flex xs12 sm12 md6  >
                                                    <v-card class="left_image">
                                                        <img :src="getImage(page,'left')" alt="" height=100%>
                                                    </v-card>
                                                </v-flex>
                                                <v-flex xs12 sm12 md6 >
                                                    <v-card class="right_image">
                                                        <img :src="getImage(page,'right')" alt="" height=100%>
                                                    </v-card>
                                                </v-flex>
                                    </v-layout>
                           </v-flex>
                       </v-layout>
            </v-flex>

        </v-layout>
        <page-modal-preview-book
            :show="show_preview_book"
            :row_record="area_rows"
            @close_dialog = "show_preview_book=false">
        </page-modal-preview-book>
     </v-container>
</template>
<style scoped>
    li.complete {
        background: #DDD;
    }
    .rowItem.toc{
        border:lightgrey 1px solid
    }
</style>

<script>
 import Vue from 'vue';
 import PageModalPreviewBook from "@/components/partial/page-modal-preview-book"
import {mapGetters,mapActions} from "vuex";
import { Http,ApiPrivateHttp } from '@/shared/http-service'
// import {syllabus} from "@/store/static-record";
import _ from "lodash";


 export default {
  name: 'Pagination',
  components:{
      PageModalPreviewBook,
    },
  methods: {
      ...mapActions([
           "pageUpdateOption",
        ]),
    getPageTsv(){
        let page_file_name = "page-rows";
        return new Promise((resolve,reject)=>{
            Http({
                methods:"get",
                url: `/static/${page_file_name}.tsv`,
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
    //Update Codex 
    updateCodex(codex){
        let codexInstance = _.find(this.option.codex, {code:codex});
        this.pageUpdateOption({type:'codex',values:codex})
        this.pageUpdateOption({type:'syllabus_code',values:codexInstance.syllabus})
    },
    //Add Area Row  
    addAreaRow(){
          
          this.area_rows.push({   
                domain:this.current_page.domain,
                area:this.current_page.area,
                ku:this.current_page.knowledge_unit,
                left_page_image_path:"",
                right_page_image_path:"",             
                preview:false,
                tools:false
            });
    },


    //Base on domain and area to select array to display 
    getPageArray({domain, area,ku,left_page_image_path, right_page_image_path}){
        console.log(this.all_pages);
        return _.filter(this.all_pages,{
            domain,
            area,
            knowledge_unit:ku
        })
    },
    getImage({domain, area,ku,left_page_image_path, right_page_image_path}){
        let pageRow  = _.find(_.sortBy(this.all_pages,["level_of_"]),{
            domain,
            area,
            knowledge_unit:ku
        })
        return pageRow.file_path
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
  },
  created () {
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
        })
}
};    
</script>
<style scoped>

</style>
