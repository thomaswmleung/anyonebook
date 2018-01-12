<template>
  <v-dialog v-model="show" persistent max-width="1500px">
    <v-card>
      <v-container fluid text-xs-center>
        <v-layout row wrap>
          <v-flex xs2>
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
            <v-card>
              <v-container>
                <v-layout row wrap :style="{height:`${row_height}px`,overflow:'scroll'}" >
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
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs2>
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
          <v-flex>
            <v-pagination 
                 :length="Math.ceil(row_record.length)" 
                 v-model="current_index" 
                 :total-visible="7" 
                 @input = "resetPage()"
                >
            </v-pagination>
            (Total Record:  {{row_record.length}})
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');">
            {{$t("Close")}}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
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

  export default{
      name:"BookModalPreviewBook",
      components:{
        BookRowImage
      },
      props:["show","row_record","all_pages", "grey"],
      data(){
        return{
          current_index:1,
          edit1:false,
          edit2:false,
          bw1:false,
          bw2:false,
          cm1:"",
          cm2:"",
          row_height:550
        }
      },
  methods: {
     resetPage()
      {
          this.edit1=this.row_record[this.current_index-1].left_edit;
          this.edit2=false;
          this.bw1=false;
          this.bw2=false;
      },
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
          this.$emit("changeRowValue", {current_index:this.current_index, attr:attr_key, value});
      }
  },
  computed:{
        ...mapGetters({
            all_page:"allPages"
        }),
      page(){
        return this.row_record[this.current_index-1]||{};
      }     
  }
};
</script>

