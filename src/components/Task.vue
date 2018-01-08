<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4>
                <h2>Here is the to do list </h2>
            </v-flex>
            <v-flex xs8>
                <v-layout row wrap>
                    <v-flex xs8>
                        <ul>
                            <li v-for="item in items" :key="item" >{{item}}</li> 
                        </ul>

                        <ul>
                            <li v-for="item in completed" :key="item" :style="{background:'lightgreen'}" >{{item}}</li> 
                        </ul>

                    </v-flex>
                    <v-flex xs4>
                        Try
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
             <v-flex xs12>
                  <h4> i18n Language integration</h4>
             </v-flex>
            <v-flex xs3>
               <v-btn flat @click.stop="$i18n.set('tc')">中文</v-btn>
               <v-btn flat @click.stop="$i18n.set('en')">English</v-btn>
            </v-flex>
            <v-flex xs9>
                <p>{{$t('shop')}}</p>
                <p>{{$t('about')}}</p>                
            </v-flex>
        </v-layout>
        <v-layout row wrap id="dragContainer">
             <v-flex xs12>
                  <h4>Row Item, Handle Drag and drop event,Delete confirmation box and Show Preview </h4>
             </v-flex>
            <v-flex xs12 md3>
               <ul>
                    <li class="completed">Show Tool box when click with transition effect</li>
                    <li class="completed">When User click on the DrapAndDrop Icon It can move the item around</li>
                    <li class="completed">Click on delete button show modal popup delete </li>
                </ul> 
            </v-flex>
            <v-flex xs12 md9 class="rowContainer toc" id="toc" > 
                
                       <v-layout row wrap v-for="(page,index) in pages" :key="page.domain+page.area+page.ku" class="rowItem toc" :data="page" :id="`page-${index}`">
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

        <!-- Popup for confirm action-->
        <v-layout row justify-center>
            <v-dialog v-model="rowConfirmDelete" max-width="750">
                <v-card>
                    <v-card-title class="headline">
                        {{$t('confirm_remove_page',{
                                    domain:pages[rowIndex]['domain'],
                                    area:pages[rowIndex]['area'],
                                    page:(rowIndex+1)*2
                                })}}</v-card-title>
                    <!-- <v-card-text>{{$t('confirm_remove_page',{domain:pages[rowIndex]['domain'],area:pages[rowIndex]['area'],page:(rowIndex+1)*2})}}</v-card-text> -->
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat="flat" @click.native="processDelete">{{$t("Delete")}}</v-btn>
                    <v-btn color="darken-1" flat="flat" @click.native="rowConfirmDelete=false">{{$t('Cancel')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

     </v-container>
</template>
<style scoped>
    li.complete {
        background: #DDD;
    }
</style>

<script>
 export default {
  name: 'Pagination',
  mounted: function() {
    lmdd.set(document.getElementById('dragContainer'), {
      containerClass: 'rowContainer',
      draggableItemClass: 'rowItem',
      handleClass: 'handle',
      dataMode: true
    });
    this.$el.addEventListener('lmddend', this.handleDragEvent);
  },
  methods:{
      handleDragEvent(event) {
          console.log(event.detail.to.container.classList);
          let dragItemIndex = event.detail.draggedElement.id.split(/-+/).pop();              
          this.pages.splice(
              event.detail.to.index,
              0,
              this.pages.splice(dragItemIndex,1)[0]);
     },
      updatePageRecord(index,attribute){
          console.log(index, attribute);
          this.pages.forEach(page=>{page["preview"]=false;page[attribute]=false;});
          this.pages[index][attribute]= true;
      },
      confirmDelete(index){
          this.rowConfirmDelete = true;
          this.rowIndex = index;          
      },
      processDelete(){
          this.pages.splice(this.rowIndex,1);
          this.rowConfirmDelete = false; 
      }
  },
  data() {
    return {
        unit:[],
        rowConfirmDelete:false,
        rowIndex:0,  
        pages:[
            {
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
            }

        ],
        meta:{},
        items:[                       
            "receive record from props, page record, unit record  ",            
            "Using Vuex as state management,split into module common, pagination, order, user",
            "Using Page attribute to navigate the page"
        ],
        completed:[
            "Http controller, API integration with backend",
             "Add button within page row with hide and show logic ",
            "Design the UI logic for Page row and Unit",
            "Handle Drag and drop event",
            "using Vuetify layout",
            "i18n Language integration"

        ]
    };
  },
};    
</script>
<style scoped>
   .completed {
       background:lightgreen;
   }
</style>
