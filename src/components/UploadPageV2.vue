<template>
    <v-container fluid >        
        <v-layout row wrap>
            <v-flex md3>
                <v-card hover 
                    v-for="option in version_option_list" 
                    :key="option.label"
                    style="margin-top:0.3em"                    
                    >
                    <div @click.stop="show_upload_pdf=true; updateCurrentVersion(option)">
                        <v-card-title style="font-size:1.2em">
                            {{$t(option.label)}}
                        </v-card-title>
                    </div>
               </v-card>
            </v-flex>
            <v-flex md6 d-flex >
                <v-card>
                    <v-card-title>
                            <h3 class="title">
                                <span>{{$t('Page Information')}}</span>
                                <span>({{$t(current_page._id==""?"Add":"Edit")}})</span>
                                <span v-if="current_page._id!=''">
                                    PageID - {{current_page._id}}
                                </span>
                                <v-btn fab dark small color="primary" @click.stop="uploadPDF">
                                    <v-icon v-html="uploadIcon"></v-icon>
                                </v-btn>
                                <v-btn fab dark small color="error" @click.stop="deletePDF">
                                    <v-icon >delete</v-icon>
                                </v-btn>
                            </h3>
                        </v-card-title>
                    <v-card-text>                        
                        <v-btn x-large style="height:8em;width:100%" @click.stop="uploadPDF">
                            <v-icon x-large v-html="uploadIcon"></v-icon>
                        </v-btn>
                    </v-card-text> 

                    <v-layout row wrap>
                    <v-flex>
                        <v-card hover >
                            <v-card-title>
                                <h3 class="subtitle">
                                    <span>{{$t('version')}}</span> 
                                    <v-btn fab dark small color="primary" @click.stop="uploadPDF">
                                        <v-icon>{{uploadIcon}}</v-icon>
                                    </v-btn>
                                </h3>
                            </v-card-title>
                            <v-container>
                            <!-- Listing PDF version-->
                                <v-layout row wrap>
                                    <!-- user level nature position output file_path_btn preview_btn remove_btn -->
                                    <v-flex  v-for="(row,idx) in current_page.version" 
                                            :key="row.user+row.level+row.nature+row.position+row.output" 
                                        xs12 md6 >
                                        <v-card>
                                            <div style="padding:1em;font-size:1.1em">
                                                <span 
                                                    v-for="lbl in ['user','level','nature','position','output']" 
                                                    :key="lbl">
                                                    {{versionField(lbl,row[lbl])}}&nbsp;&nbsp;
                                                </span>
                                                <br>
                                                <span>
                                                    <v-btn  dark small color="primary" @click.stop="pageUpdateVersionIndex(idx);show_upload_pdf=true;">
                                                        <v-icon dark>mode_edit</v-icon>
                                                    </v-btn>
                                                    <v-btn   dark small color="error" @click.stop="pageDeleteVersion(idx)">
                                                        <v-icon dark>delete_forever</v-icon>
                                                    </v-btn>
                                                </span>
                                            </div>
                                        </v-card>                                                    
                                    </v-flex>                                                                                               
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>            
                </v-layout>
                <page-affiliaton-list></page-affiliaton-list>              
                </v-card>
                
            </v-flex>
             <v-flex md3>
                 <page-detail-form></page-detail-form>
            </v-flex>
        </v-layout>
        <!--
            include the modal(dialog) for different PDF version upload                       
        -->
        <page-modal-upload-pdf
            :show="show_upload_pdf"
            @close_dialog = "show_upload_pdf=false">
        </page-modal-upload-pdf>
        
     </v-container>
</template>
<style scoped>
li.complete {
  background: #ddd;
}
</style>

<script>
import Vue from 'vue';
import {mapGetters,mapActions} from "vuex";
// import {syllabus} from "@/store/static-record";
import _ from "lodash";

import PageModalUploadPdf from "@/components/partial/page-modal-upload-pdf"
import PageAffiliatonList from "@/components/partial/page-affiliation-list"
import PageDetailForm from "@/components/partial/page-detail-form"


export default {
  name: "Pagination",
  components:{
      PageModalUploadPdf,
      PageAffiliatonList,
      PageDetailForm,
    },
   created () {
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
      ...mapActions([
          "pageUpdateOption",
          "pageUpdateVersionIndex",
          "pageUpdateVersion",
          "pageDeleteVersion",
          "getPageById",
          "pageResetOption",
        ]),
        fetchData(){
            // fetch the data when the view is created and the data is
            // already being observed
            if(this.$route.params.id){
                this.getPageById(this.$route.params.id)
            }else{
                this.pageResetOption();   
            }
        },
        //
        versionField(lbl,value){
            let _record =_.find(this.option[lbl],{code:value});
            return _record?_record["label"]:"" 
        },
        updateCurrentVersion(opt){
           let i ; 
           for(i in opt){
               if(i != "label"){
                   this.pageUpdateVersion({attr:i,val:opt[i].code })
               }
           }
        },
    //Upload PDF process - trigger 
        uploadPDF() {
            //validate meta information filled or not 
            let processBoolFlag = true;
            let attr;
           ['codex','syllabus_code','domain','area'].forEach(
               attr=>{
                    if(this.current_page[attr]==""){processBoolFlag=false;}
               }
           );
            //  console.log("Upload PDF",processBoolFlag, this.current_page,this.$t);
            if(processBoolFlag){
                this.pageUpdateVersionIndex(-1);
                //Show PDF upload modal 
                this.show_upload_pdf = true;
            }else{
                // if not show a the toast require to fill the page information, and close the modal
                Vue.toasted.error(this.$t('Please fill page information before upload')).goAway(3000);                
            }
        },
    
  },
  computed:{      
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",  
        })  
  },
  data() {
    return {
      valid: "",
      uploadIcon:"attachment",
      showTaskItem: false,
      selectedPDF: {},
      codex:"",
      syllabus:"",
      domain:"",
      area:"",
      knowledge_unit:"",
    //   all_syllabus:syllabus,
      

      previous_page_id:"",
      
      show_upload_pdf:false,
      version_option_list:[ 
          {label:"Student Baseline B&W",
            user:{ code: "S", label: "Student Un-coded" },
            level:{ code: "B", label: "Baseline" },
            nature:{ code: "Q", label: "Question" },
            position:{ code: "V", label: "Inside Page" },
            output: { code: "K", label: "Black/White" },
          }, {label:"Student Baseline Color",
            user:{ code: "S", label: "Student Un-coded" },
            level:{ code: "B", label: "Baseline" },
            nature:{ code: "Q", label: "Question" },
            position:{ code: "V", label: "Inside Page" },
            output: { code: "C", label: "Color" },
          },{label:"Teacher Baseline B&W",
            user:{ code: "U", label: "Teacher Un-coded" },
            level:{ code: "B", label: "Baseline" },
            nature:{ code: "Q", label: "Question" },
            position:{ code: "V", label: "Inside Page" },
            output: { code: "K", label: "Black/White" },
          },{label:"Other"},
      ]
    };
  }
};
</script>
