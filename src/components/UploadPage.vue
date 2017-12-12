<template>
    <v-container fluid grid-list-md >
        <v-layout row wrap v-if="showTaskItem">
            <v-flex xs4>
                <h2>Upload Page </h2>
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
        
            <v-flex md8>
                <v-card >
                    <v-container>
                        <v-card-title>
                            <h3 class="title">
                                <span>{{$t('Page Information')}}</span>
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
                                    <v-btn v-if="current_page.previous_page_id==''">{{$t('Previous Page')}}</v-btn>
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
                                                    <v-icon v-html="uploadIcon"></v-icon>
                                                </v-btn>
                                            </h3>
                                        </v-card-title>
                                        <v-container>
                                        <!-- Listing PDF version-->
                                            <v-layout row wrap>
                                                <!-- user level nature position output file_path_btn preview_btn remove_btn -->
                                                <v-flex  v-for="i in 8" :key="i" xs12 md6 >
                                                    <span > v-for {{i}} &nbsp; </span>
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
                                                <v-flex md6>{{row.publisher}},{{row.book_title}}</v-flex>
                                                <v-flex md5>{{row.edition}},{{row.unit}}</v-flex>
                                                <v-flex md1>{{row.page_number}}</v-flex>
                                            </v-layout>
                                            <v-layout row wrap>
                                                <v-flex md12>
                                                    <v-btn fab dark small color="primary" @click.stop="addAffilication(idx)">
                                                        <v-icon dark>mode_edit</v-icon>
                                                    </v-btn>
                                                    <v-btn  fab dark small color="error" @click.stop="pageDeleteAffiliation(idx)">
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
        <page-modal-affiliation 
            :show="show_affiliation"
            :record="current_affiliation"
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
 import {mapGetters,mapActions} from "vuex";
// import {syllabus} from "@/store/static-record";
import _ from "lodash";

import PageModalAffiliation from "@/components/partial/page-modal-affiliation"

export default {
  name: "Pagination",
  components:{PageModalAffiliation},
  methods: {
      ...mapActions(["pageUpdateOption","pageUpdateAffiliationIndex","pageDeleteAffiliation"]),
    //Upload PDF process - trigger 
        uploadPDF() {
            console.log("Upload PDF");
            //Show PDF upload modal 
            this.show_fullscreen_loader = true;
        },
    //Process PDF upload 
        processPDF(){
            //Check page group id is exist or not 
            //If not,create a new page 
                //validate meta information filled or not 
                // if not show a the toast require to fill the page information, and close the modal
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
    
        addPreviousPageRecord(){
            //Add Page Record
            //Get Page Record by Page ID 

            
            // Case has multiple pages 
            /*
                provide a case study binding set, working with ilearners moodle, 
                allow the user can exchange idea through social media (if necessary)
                user go to select a theme, have material about that theme background information, detail , graphic etc , then provide various addon discussion question, 
                sample essay from previous student?
                user pick a theme 
                select topic and case 
                choose addon discussion question and execerise
                the problem set can be focus on theory or partical approach to  

                活頁 教材 

                the engine is the same, but have much more flexible approach to the market, 
                any educator can make used this approach to create education material, (using existing online PDF Editing Software) 
                https://www.sejda.com/pdf-editor or using google doc to export pdf, problem might rise is the format of the page                 
            */

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
      
      show_fullscreen_loader:false,

      items: [
        "Web form to upload page",
        "Handle Media API with modal and Form, Update API to handle PDF page",
        "Upload multiple PDF into same PDF Page file",
        "Add modal popup for previous page handling",
        "handle modal upload"
      ],
      completed: []
    };
  }
};
</script>
<style scoped>
</style>
