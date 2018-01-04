<template>
  <v-dialog v-model="show" persistent max-width="950px">
     <v-card>
       <v-card-title>
          <span class="headline">
            PDF {{$t('version')}}
            ({{$t(current_page_version_index==-1?'Add':'Edit')}})
          </span>
        </v-card-title>
        <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 sm6 md3 
                  v-for="item in form_fields" 
                  :key="item.code">
                  <div>{{$t(item.lbl)}}</div>
                 <v-radio-group 
                    v-model="current_page_version[item.code]" 
                    column
                    @change="pageUpdateVersion({attr:item.code,val:$event})" 
                 >
                    <v-radio
                        v-for="opt in option[item.code]"
                        v-if="opt.code"
                        :key="opt.code" 
                        :label="opt.label" 
                        :value="opt.code"></v-radio>
                 </v-radio-group>
              </v-flex>

               <v-flex xs6 sm6 md9>
                <v-text-field
                  :label="$t('Remark')"                  
                  autocomplete
                  chips
                   v-model= "current_page_version.remark"
                  @input="pageUpdateVersion({attr:'remark',val:$event})" 
                ></v-text-field>
              </v-flex>
              
              <v-flex xs2 sm1 md1 >
                <input type="file" 
                     ref="fileInput"
                     multiple="false"
                    @change="onFileChange">
                  
              </v-flex>
             
            </v-layout>
        </v-container>
        <small>*{{$t("indicates required field")}}</small>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');pageResetVersion()">
            {{$t("Close")}}
          </v-btn>
          <v-btn v-if="current_page_version_index==-1" color="blue darken-1" flat @click.native="uploadPdf">
            {{$t('Add')}}         
          </v-btn>
        </v-card-actions>
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
  
  export default{
      name:"PageModalUploadPdf",
      components:{
        
      },
      props:["show"],
      data(){
        return{
          formData:{},
          fileChangeBoolFlag:false,
          form_fields:[
                {lbl:'User',code:'user'},
                {lbl:'Level',code:'level'},
                {lbl:'Nature',code:'nature'},
                {lbl:'Position',code:'position'},
                {lbl:'Output',code:'output'},], 
          uploadIcon:"attachment",
          page_number:1,
          filteringName:false,
        }
      },
      methods:{
        ...mapActions([
            "showFullscreenLoader",
            "pageUpdateVersion",
            "pageUpdateVersionIndex",
            "pageResetVersion",
            "pagePushOrModifyVersionArray",
            "getMedia",
            "uploadMedia",

            "getPageById",
            "createPage",
            "pageUpdateOption",
            "pageResetOption",
            "pageUploadVersion",

          ]),
          uploadPdf(){
            let processBoolFlag = true;
            //Check all the parameter is exist before process 
            console.log(this.form_fields);
            this.form_fields.forEach(item=>{
              if(this.current_page_version[item.code]==""){
                processBoolFlag = false;
              }
            })
            if(processBoolFlag){
             this.$refs.fileInput.click(); 
            }else{
                // if not show a the toast require to fill the page information, and close the modal
                Vue.toasted.error(this.$t('Please fill in information of this version before upload')).goAway(3000);                
            }
          },
          //Process PDF upload 
        processPDF(files){
          let _instance = this;
        //upload pdf media api
          let formData = new FormData();
          formData.append('media_file',files[0])

          let params = {}
          params.extension = getExtension(files[0].name)
          params.type = "page_version_pdf"
          params.tag= [
            _instance.current_page.codex, 
            _instance.current_page.syllabus,
            _instance.current_page.domain, 
            _instance.current_page.area,
            _instance.current_page.knowledge_unit  
          ]
          params.usage = [_instance.current_page._id]

          _instance.pageUploadVersion({formData, params}).then(
            responsePageVersion=>{
              //call page_group api and set parent_page_group as  page-group-id
              let page ={};
              page._id = "";
              page.page_group = {};
              page.page_group.import_url = responsePageVersion.data.url;
              page.version = _instance.current_page_version;
              page.affiliation = {};
              page.parent_page_group_id = _instance.current_page._id
              // page.page_group.page= []
              _instance.createPage({page}).then(
                response=>{
                  //hide loading 
                  _instance.showFullscreenLoader(false);                            
                  _instance.$router.push(`/upload_page/${_instance.current_page._id}`);                            
                 _instance.$emit("close_dialog");
                  
                }
              )
            },
            errorPageVersion=>{
              Vue.toasted($t('Fail to append page version to this record'));
              _instance.showFullscreenLoader(false);
            }
          )                       
        },
        onFileChange($event){
          const files = $event.target.files || $event.dataTranasfer.files
          let page_parameter = {};
          let _instance = this;
          // this.pagePushOrModifyVersionArray()
            //this.$emit('close_dialog');
            //Check page group id is exist or not 
            this.showFullscreenLoader(true);
            if(this.current_page._id==""){
              //If not,create a new page
              page_parameter.page_group= _.clone(this.current_page);
              page_parameter._id = page_parameter.page_group._id;
              //custom mapping 
              page_parameter.page_group.subdomain = page_parameter.page_group.area; 
              page_parameter.page_group.sub_title = page_parameter.page_group.knowledge_unit;
              page_parameter.page_group.layout = page_parameter.page_group.syllabus;             
              // page_parameter.page_group.page = [];
              delete page_parameter.page_group._id;

              //format the parameter and call page_group API, wait for return 
              this.createPage({page:page_parameter})
                .then(response=>{                
                    //update page-group-id  
                    _instance.pageUpdateOption({
                      type:"_id",
                      values:response.page_group_id
                    });
                    _instance.processPDF(files);
                  },
                  error=>{
                    console.error($t('Fail to create Page Record'),error);
                    Vue.toasted($t('Fail to create Page Record'));
                    _instance.showFullscreenLoader(false);
                  }  
                )
            }else{
             _instance.processPDF(files); 
            }
         
        },
      },computed:{      
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",
            current_page_version:"currentPageVersion",
            current_page_version_index:"currentPageVersionIndex",
            all_media:"allMedia", 
            media_paginator:"mediaPaginator"
        })
      }
    }
</script>