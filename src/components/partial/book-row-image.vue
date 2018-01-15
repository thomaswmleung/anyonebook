<template>
    <v-layout >
        <v-flex xs1 style="margin:auto">
            <v-btn fab dark small 
                  v-if="show_arrow('left')"
                  @click.stop="updatePageIndex('left')"
                  color="primary" 
                  class="xsBtn" >
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs10 >
            <v-btn  fab dark small color="primary" class="xsBtn" v-if="show_arrow('up')">
                <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
            <!--
            <p 
               v-if="getImage()" 
               style="margin-bottom:0px">                                 
                <img                   
                    :src="getImage()"
                    :style="{height:`${row_height-70}px`}"
                    :class="{bw:grey}"   
                 /> 
            </p> 
            
            <div v-if="getImage()">
                <viewer>
                    <img 
                        :src="getImage()" 
                        :class="{bw:grey}"
                    />
                </viewer>
            </div>--> 
        <div class="viewer-wrapper" v-if="getImage()">
          <viewer :options="options" :images="[getImage()]"
                  @inited="inited"
                  class="viewer" ref="viewer"
          >
            <template slot-scope="scope">
              <figure class="images">
                <div class="image-wrapper" >
                  <img class="image bw"
                    
                       :src="getImage()" 
                       :data-source="getImage()" 
                       :alt="getImage().split('/').pop()"
                      :style="{height:`${row_height-70}px`}"
                  >
                </div>
              </figure>
            </template>
            <div style="height:0px">
                 {{imageGray}}
            </div>
          </viewer>
        </div>
            <v-card v-if="!getImage()" 
                   :style="{height:`${row_height-70}px`, margin:'auto'}"
                 >
                    <span>{{$t("No Page available")}}</span>
           </v-card>
            <v-btn  fab dark small color="primary" class="xsBtn"  v-if="show_arrow('down')">
                <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs1 style="margin:auto">
            <v-btn  fab dark small color="primary" 
                class="xsBtn"  
                v-if="show_arrow('right')"                
                @click.stop="updatePageIndex('right')">
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
  props:[
      "all_pages",
      "page",
      "row_height",
      "side",
      "grey",
      "current_index"
      ],
  computed:{      
        ...mapGetters({
        })  
  },
  methods: {
      ...mapActions([
        ]),
     inited (viewer) {
      this.$viewer = viewer
      if(this.grey&&this.$viewer.image){
        this.$viewer.image.style.filter ="grayscale(100)"
      }
    },
    getImage(){
        let {
             left_index, 
             right_index,
            } = this.page;
        let path = false;
        let pageObj = {}
        if(this.pages){
            pageObj = this.pages[this.side=="left"?left_index:right_index];
            path = pageObj?pageObj.file_path:"";
        }
        return path;
    },
    show_arrow(direction){
        let flag=!!this.getImage();
        let {
             left_index, 
             right_index,
            } = this.page;
        let _index = this.side=="left"?left_index:right_index;
        if(direction=="up"){
            flag=false;
        }
        if(direction=="down"){
              flag=false;
        }
        if(direction=="left" ){
            flag = !!this.pages[_index-1]
        }
        if(direction=="right"){
            flag = !!this.pages[_index+1]
        }
        return flag;
    },
    updatePageIndex(direction){
        let row_index = 0 ;
         let {
             left_index, 
             right_index,
            } = this.page;
        let _index = this.side=="left"?left_index:right_index;
        if(direction=="left"){
            _index -=1;
        }
        if(direction=="right"){
            _index +=1;
        }
        this.$emit("changeRowValue", {current_index:this.current_index, attr:`${this.side}_index`, value:_index});
    }
  },

  computed:{
       pages(){
           let {
             domain, 
             area,
             ku,
            } = this.page;
        return _.filter(
                    _.sortBy(this.all_pages,["level_of_difficulty"])
                    ,{
                        domain,
                        area,
                        knowledge_unit:ku
                    });
           
      }, 
       imageGray(){
           let str = this.grey;
           if(this.$viewer ){
                this.$viewer.image.style.filter =this.grey?"grayscale(1)":"";
                str = this.$viewer.image.style.filter;
                console.log(str,this.$viewer.image.style.filter);
            }
            //return  this.$viewer.image.style.filter;
            return str 
       },
       
  },
  data(){
      return{
          options:{"inline": true, "button": true, "navbar": false, "title": false, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": false, "scalable": false, "transition": false, "fullscreen":true, "keyboard": false}
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
       opacity: .2; 
    }

.viewer-wrapper {
    position: relative;
    background: #333;
    height: 100%;
  }
  .methods {
    margin-bottom: 1em;
    flex-wrap: wrap;
    & > * {
      margin-right: 0.75rem;
    }
  }
  .options-panel {
    .panel-block {
      padding: 0;
      .checkbox {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0.5em 0.75em;
      }
    }
  }
  .viewer {
    height: 100%;
    .images {
      width:100%;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px;
      .image-wrapper {
        display: inline-block;
        width: calc(33% - 20px);
        margin: 5px 5px 0 5px;
        .image {
          width: 100%;
          cursor: pointer;
          display: inline-block;
        }
      }
    }
  }    
</style>
