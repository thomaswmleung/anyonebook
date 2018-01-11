<template>
    <v-layout >
        <v-flex xs1 style="margin:auto">
            <v-btn fab dark small 
                  v-if="show_arrow('left')"
                  @click.stop="updatePageIndex()"
                  color="primary" 
                  class="xsBtn" >
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs10 >
            <v-btn  fab dark small color="primary" class="xsBtn" v-if="show_arrow('up')">
                <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
            <p style="margin-bottom:0px">
                <img
                    v-if="getImage()" 
                    :src="getImage()"
                    :style="{height:`${row_height-70}px`}"
                    :class="{bw:grey}"   
                 />
                <v-card v-if="!getImage()" 
                   :style="{height:`${row_height-70}px`, margin:'auto'}"
                 >
                    <span>{{$t("No Page available")}}</span>
                </v-card>
            </p>
            <v-btn  fab dark small color="primary" class="xsBtn"  v-if="show_arrow('down')">
                <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs1 style="margin:auto">
                <v-btn  fab dark small color="primary" class="xsBtn"  v-if="show_arrow('right')">
                <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
        </v-flex>                                                    
    </v-layout>
</template>
<script>
import Vue from 'vue';
import {mapGetters,mapActions} from "vuex";
// import {syllabus} from "@/store/static-record";
import _ from "lodash";

export default {
  name: "BookRowImage",
  props:["all_pages",
    "page",
    "row_height",
    "side","grey"],
  computed:{      
        ...mapGetters({
        })  
  },
  methods: {
      ...mapActions([
        ]),
    getImage(){
        let {
             domain, 
             area,
             ku,
             left_index, 
             right_index
            } = this.page;
        let pageRow  = _.filter(this.pages,{
            domain,
            area,
            knowledge_unit:ku
        });
        let path = false;
        let pageObj = {}
        if(pageRow){
            console.log(pageRow);
            pageObj = pageRow[this.side=="left"?left_index:right_index];
            path = pageObj?pageObj.file_path:"";
        }
        return path;
    },
    show_arrow(direction){
        let flag=false;
        if(direction=="up"){

        }
        if(direction=="down"){
            
        }
        if(direction=="left"){
            
        }
        if(direction=="right"){
            
        }
        return flag;
    }
  },
  computed:{
       pages(){
          return _.sortBy(this.all_pages,["level_of_difficulty"])
      }, 
  },
  data(){
      return{
      }
  },
   components:{
   }
}
</script>
<<style scoped>
    .xsBtn{
        height: 20px;
        width: 20px;
        margin:0;
    }
    img.bw {
	filter: grayscale(100);
  }
</style>
