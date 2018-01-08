<template>
    <v-container grid-list-md id="dragContainer">
        <v-layout row wrap>
            <v-flex md3>
                <h2>Create Blank New Book / From Existing Book</h2>
                 <!-- Preview -->
                 <img style="width=95%"/>
                 <!-- Codex List -->

            </v-flex>
             <v-flex xs12 md9 class="rowContainer toc" id="toc" > 
                
                       <v-layout row wrap v-for="(page,index) in area_rows" :key="page.domain+page.area+page.knowledge_unit" class="rowItem toc" :data="page" :id="`page-${index}`">
                           <v-flex xs12  >
                               <v-card>
                                        <v-card-title primary-title>
                                            <v-layout row wrap @click.stop="updatePageRecord(index,'tools')" >
                                                <v-flex xs4  >
                                                    <h4 class="title mb-0">{{page.domain}}</h4>
                                                </v-flex>
                                                 <v-flex xs4  >
                                                    <h3 class="subtitle mb-1">{{page.area}} </h3>
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
                                        </v-card-title>
                                     <v-layout row wrap >
                                            <v-flex xs12 sm12 md6  >
                                                    <v-card>
                                                        <v-card-media :src="page.image"  :style="{height:page.preview?'450px':'0px'}">
                                                        </v-card-media>
                                                    </v-card>
                                                </v-flex>
                                                <v-flex xs12 sm12 md6 >
                                                    <v-card>
                                                        <v-card-media :src="page.image"   :style="{height:page.preview?'450px':'0px'}">
                                                        </v-card-media>
                                                    </v-card>
                                                </v-flex>
                                    </v-layout>
                                 
                                </v-card>
                           </v-flex>
                       </v-layout>
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
import {mapGetters,mapActions} from "vuex";
import { Http,ApiPrivateHttp } from '@/shared/http-service'
// import {syllabus} from "@/store/static-record";
import _ from "lodash";


 export default {
  name: 'Pagination',
  methods: {
      ...mapActions([
          "getStyllabus",
        ]),
    //FetchData 
    fetchData(){
        
    },
    //Base on domain and area to select array to display 
    getPageArray({domain, area}){

    },
     handleDragEvent(event) {
          console.log(event.detail.to.container.classList);
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
          this.rowConfirmDelete = true;
          this.rowIndex = index;          
      },
      processDelete(){
          this.area_rows.splice(this.rowIndex,1);
          this.rowConfirmDelete = false; 
      }
  },
  created () {
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  data() {
    return {
        all_pages:[], 
        area_rows:[{
                domain:"tree",
                area:"forest",
                ku:"dying tree",
                image:"//writingexercises.co.uk/images2/randomimage/tree.jpg",
                preview:false,
                tools:false
            },{
                domain:"tree",
                area:"inhouse",
                ku:"paper bird in the birdcage",
                image:"//writingexercises.co.uk/images2/randomimage/birdcage.jpg",
                preview:false,
                tools:false
            },{
                domain:"sea",
                area:"boat",
                ku:"boat",
                image:"http://writingexercises.co.uk/images2/randomimage/boat.jpg",
                preview:false,
                tools:false
            },{
                domain:"people",
                area:"action",
                ku:"rain-coats",
                image:"http://writingexercises.co.uk/images2/randomimage/rain-coats.jpg",
                preview:false,
                tools:false
            },{
                domain:"tree",
                area:"store",
                ku:"woodtextures",
                image:"http://writingexercises.co.uk/images2/randomimage/woodtextures.jpg",
                preview:false,
                tools:false
            }], //domain, area  
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
        })
}
};    
</script>
<style scoped>

</style>
