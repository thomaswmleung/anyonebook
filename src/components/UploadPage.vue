<template>
    <v-container fluid grid-list-md >        
        <v-layout row wrap>
            <v-flex md8>
                <v-card >
                    <v-container>
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
                            </h3>
                        </v-card-title>
                        <v-form v-model="valid" ref="page_meta" lazy-validation>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-select :items="option.codex" 
                                              item-value="code"
                                              item-text="label"
                                              v-model="current_page.codex"
                                              @input="pageUpdateOption({type:'codex',values:$event})"
                                              :label="$t('Codex')" editable ></v-select>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select :items="option.syllabus" 
                                              item-value="code"
                                              item-text="label"
                                              v-model="current_page.syllabus"
                                              @input="pageUpdateOption({type:'syllabus',values:$event})"
                                              :label="$t('Syllabus')" editable ></v-select>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select :items="option.domain" 
                                              v-model="current_page.domain"
                                              @input="pageUpdateOption({type:'domain',values:$event})"
                                              :label="$t('Domain')" editable ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4><v-select :items="option.area" 
                                v-model="current_page.area"
                                              @input="pageUpdateOption({type:'area',values:$event})"                        
                                              :label="$t('Area')" editable ></v-select></v-flex>
                                <v-flex xs12 md4><v-select :items="option.knowledge_unit" 
                                v-model="current_page.knowledge_unit"
                                              @input="pageUpdateOption({type:'knowledge_unit',values:$event})"                                              
                                              :label="$t('Knowledge Unit')" editable ></v-select></v-flex>                                
                                 <v-flex xs12 md4>
                                    <!-- @TODO mapping existing page to previous page, if previous page is exist -->
                                    <v-btn v-if="current_page.previous_page_id==''">{{$t('Link Previous Page')}}</v-btn>
                                </v-flex>    
                                <v-flex xs12 md12>
                                    <v-text-field
                                        :label="$t('Remark')"
                                        v-model="current_page.remark"
                                        @input="pageUpdateOption({type:'remark',values:$event})"
                                    ></v-text-field>
                                </v-flex>              
                            </v-layout>
                           
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
                                             <v-layout row wrap >
                                                 <v-btn fab dark small color="primary" @click.stop="uploadPDF">
                                                    <v-icon v-html="uploadIcon"></v-icon>
                                                </v-btn>
                                            </v-layout>
                                        </v-container>
                                    </v-card>
                                </v-flex>            
                            </v-layout>

                            <!-- Affiliation-->
                            <v-layout row wrap>
                                <v-flex md12>
                                    <!-- Handle Affiliation -->
                                    <h4 class="subtitle">
                                        <span>{{$t('Affiliation')}}</span>
                                        <v-btn fab dark small primary @click.stop="addAffilication(-1)">
                                            <v-icon >add</v-icon>
                                        </v-btn>
                                    </h4>                                    
                                    <!--For Loop of all Affiliation Item-->
                                </v-flex>
                                <!--For Loop of all Affiliation Item-->
                                <v-flex md6 v-for="(row,idx) in current_page.affiliation" :key="row.publisher+row.edition+row.page_number">
                                    <v-card >
                                        <v-container>
                                            <v-layout row wrap>
                                                <v-flex md12>
                                                    {{row.publisher}}&nbsp;&nbsp;
                                                    {{row.book_title}}&nbsp;&nbsp;
                                                    {{row.edition}}&nbsp;&nbsp;
                                                    {{row.unit}}&nbsp;&nbsp;
                                                    page{{row.page_number}}
                                                </v-flex>
                                            </v-layout>
                                            <v-layout row wrap>
                                                <v-flex md12>
                                                    <v-btn dark small color="primary" @click.stop="addAffilication(idx)">
                                                        <v-icon dark>mode_edit</v-icon>
                                                    </v-btn>
                                                    <v-btn  dark small color="error" @click.stop="pageDeleteAffiliation(idx)">
                                                        <v-icon dark>delete_forever</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
               </v-card>
            </v-flex>
                <v-flex md4 d-flex >
                <v-card>
                    <v-card-title>
                        <h3 class="title">{{$t('Page Preview')}}</h3>                       
                    </v-card-title>
                    <v-card-text>                        
                        <v-btn x-large style="height:8em;width:100%" @click.stop="uploadPDF">
                            <v-icon x-large v-html="uploadIcon"></v-icon>
                        </v-btn>
                    </v-card-text>               
                </v-card>
            </v-flex>
        </v-layout>
        <!--
            include the modal(dialog) for different PDF version upload
            include the modal(dialog) for affiliation 
            include the modal(dialog) for previous page finder  
        -->
        <page-modal-upload-pdf
            :show="show_upload_pdf"
            @close_dialog = "show_upload_pdf=false">
        </page-modal-upload-pdf>
        <page-modal-affiliation 
            :show="show_affiliation"
            @close_dialog = "show_affiliation=false">
        </page-modal-affiliation>
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

import PageModalAffiliation from "@/components/partial/page-modal-affiliation"
import PageModalUploadPdf from "@/components/partial/page-modal-upload-pdf"

export default {
  name: "Pagination",
  components:{
      PageModalAffiliation,
      PageModalUploadPdf
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
          "pageUpdateAffiliationIndex",
          "pageDeleteAffiliation",
          "pageUpdateVersionIndex",
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
    //Upload PDF process - trigger 
        uploadPDF() {
            //validate meta information filled or not 
            let processBoolFlag = true;
            let attr;
           ['codex','syllabus','domain','area'].forEach(
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
    
        addPreviousPageRecord(){
            //Add Page Record
            //Get Page Record by Page ID 

            // Case has multiple pages 
        },
        addAffilication(index){
            //show modal  
            this.show_affiliation = true;
            //format the parameter and update the action 
            this.pageUpdateAffiliationIndex(index);
        }
  },
  computed:{      
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",
            current_page_affiliation_index:"currentPageAffiliationIndex",  
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
      
      show_affiliation:false,
      current_affiliation:{},

      show_previous_finder:false,
      finder_pagination:{},
      previous_page_id:"",
      
      show_upload_pdf:false
    };
  }
};
</script>
