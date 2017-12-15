<template>
  <v-dialog v-model="show" persistent max-width="750px">
     <v-card>
       <v-card-title>
          <span class="headline">
            PDF {{$t('version')}}
            ({{$t(current_page_version_index==-1?'Add':'Edit')}})
          </span>
        </v-card-title>
        <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 sm6 md4 
                  v-for="(item,idx) in form_fields" 
                  :key="idx">
                <v-select
                  :label="$t(item.lbl)"                  
                  autocomplete
                  v-model = "current_page_version[item.code]"
                  @input="pageUpdateVersion({attr:item.code,val:$event})"                  
                  :items="option[item.code]"
                  item-value="code"
                  item-text="label"
                ></v-select>
              </v-flex>
              <v-flex xs6 sm6 md4 >
                <v-btn dark color="primary" @click.stop="uploadPdf">
                     <v-icon x-large>{{uploadIcon}}</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  :label="$t('Remark')"                  
                  autocomplete
                  chips
                   v-model= "current_page_version.remark"
                  @input="pageUpdateVersion({attr:'remark',val:$event})" 
                ></v-text-field>
              </v-flex>
            </v-layout>
        </v-container>
        <small>*{{$t("indicates required field")}}</small>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');pageResetVersion()">
            {{$t("Close")}}
          </v-btn>
          <v-btn color="blue darken-1" flat @click.native="uploadPdf">
            {{$t(current_page_version_index==-1?'Add':'Edit')}}            
          </v-btn>
        </v-card-actions>
     </v-card>
  </v-dialog>
 
    
</template>
<script>
  import {mapGetters,mapActions} from "vuex";
    export default{
      name:"PageModalUploadPdf",
      props:["show"],
      data(){
        return{
          form_fields:[
                {lbl:'User',code:'user'},
                {lbl:'Level',code:'level'},
                {lbl:'Nature',code:'nature'},
                {lbl:'Position',code:'position'},
                {lbl:'Output',code:'output'},], 
          uploadIcon:"attachment",
        }
      },
      methods:{
        ...mapActions([
            "pageUpdateVersion",
            "pageUpdateVersionIndex",
            "pageResetVersion",
            "pagePushOrModifyVersionArray"
          ]),
          uploadPdf(){
            pagePushOrModifyVersionArray()
            this.$emit('close_dialog');
          },
          //Process PDF upload 
        processPDF(){
            //Check page group id is exist or not 
            //If not,create a new page 
            
                
                // if OK format the parameter and call page_group API, wait for return 
                    //update page-group-id                    
                    //upload pdf media api , show loading 
                        //call page_group api and set parent_page_group as  page-group-id   
                            //hide loading 
            
            //If page-group-id already exist 
            //upload pdf media api , show loading 
                        //call page_group api and set parent_page_group as  page-group-id   
                            //hide loading 
        },

      },computed:{      
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",
            current_page_version:"currentPageVersion",
            current_page_version_index:"currentPageVersionIndex", 
        })
  }
    }
</script>