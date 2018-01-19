<template>
    <v-container fluid >
        <v-layout row wrap>
            <v-flex md3>
                <v-card hover
                    v-for="option in version_option_list"
                    :key="option.label"
                    style="margin-top:0.3em"
                    >
                    <div @click.stop="updateCurrentVersion(option)">
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
                    <v-flex v-for="(row,idx) in current_page.version"
                            :key="row.user+row.level+row.nature+row.position+row.output"
                            xs12 md6 >
                    <v-card v-if="idx == currentPreview">
                      <v-card-media style="height: 30rem; width: 100%" :src="row.students_preview_image"></v-card-media>
                    </v-card>
                    </v-flex>
                    <v-flex v-if="current_page.version">
                    <v-card-text v-if="current_page.version.length == 0">
                        <v-btn x-large  style="height:10em; width: 100%" @click.stop="uploadPDF">
                            <v-icon x-large v-html="uploadIcon"></v-icon>
                        </v-btn>
                    </v-card-text>
                    </v-flex>
                    <v-flex v-else>
                    <v-card-text>
                        <v-btn x-large  style="height:10em; width: 100%" @click.stop="uploadPDF">
                            <v-icon x-large v-html="uploadIcon"></v-icon>
                        </v-btn>
                    </v-card-text>
                    </v-flex>
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
                                    <v-flex v-for="(row,idx) in current_page.version"
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
                                                    <v-btn fab dark small color="primary" @click.stop="pageUpdateVersionIndex(idx);show_upload_pdf=true;">
                                                        <v-icon dark>mode_edit</v-icon>
                                                    </v-btn>
                                                    <v-btn  fab dark small color="error" @click.stop="pageDeleteVersion(idx)">
                                                        <v-icon dark>delete_forever</v-icon>
                                                    </v-btn>
                                                    <v-btn
                                                      fab
                                                      dark
                                                      small
                                                      @click.stop="currentPreview = idx">
                                                      <v-icon dark>visibility</v-icon>
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
                 <page-detail-form @show_select_book="show_select_book = true"></page-detail-form>
            </v-flex>
        </v-layout>
        <!--
            include the modal(dialog) for different PDF version upload
        -->
        <page-modal-upload-pdf
            :show="show_upload_pdf"
            @close_dialog = "show_upload_pdf=false">
        </page-modal-upload-pdf>
        <page-modal-select-book
            :show="show_select_book"
            @update_previous_page_id="updatePrevPageId"
            @close_dialog = "show_select_book=false">
        </page-modal-select-book>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="save()">
            {{$t("Submit")}}
          </v-btn>
        </v-card-actions>
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

import PageModalSelectBook from "@/components/partial/page-modal-select-book"
import PageModalUploadPdf from "@/components/partial/page-modal-upload-pdf"
import PageAffiliatonList from "@/components/partial/page-affiliation-list"
import PageDetailForm from "@/components/partial/page-detail-form"


export default {
  name: "Pagination",
  components:{
      PageModalSelectBook,
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
          "createPage",
          "showFullscreenLoader"
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
              let i;
              for(i in opt){
                 if(i != "label"){
                     this.pageUpdateVersion({attr:i,val:opt[i].code })
                 }
              }
              this.show_upload_pdf=true;
            }else{
                // if not show a the toast require to fill the page information, and close the modal
                Vue.toasted.error(this.$t('Please fill page information before upload')).goAway(3000);
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

        updatePrevPageId(id) {
          console.log('previous pgae id ' + id)
          this.pageUpdateOption({type:'previous_page_id',values:id})
        },

        save(){
          let page_parameter = {};
          let _instance = this;
          // this.pagePushOrModifyVersionArray()
            //this.$emit('close_dialog');
            //Check page group id is exist or not
            this.showFullscreenLoader(true);
              //If not,create a new page
              page_parameter.page_group= _.clone(this.current_page);
              page_parameter._id = page_parameter.page_group._id;
              //custom mapping
              page_parameter.page_group.subdomain = page_parameter.page_group.area;
              page_parameter.page_group.sub_title = page_parameter.page_group.knowledge_unit;
              page_parameter.page_group.layout = page_parameter.page_group.syllabus;
              page_parameter.page_group.previous_page_id = page_parameter.page_group.previous_page_id;
              // page_parameter.page_group.page = [];
              // delete page_parameter.page_group._id;

              //format the parameter and call page_group API, wait for return
              console.log("save page with page_parameter" + JSON.stringify(page_parameter))
              this.createPage({page:page_parameter})
                .then(response=>{
                    //update page-group-id
                    _instance.pageUpdateOption({
                      type:"_id",
                      values:response.page_group_id
                    });
                    _instance.showFullscreenLoader(false);
                  },
                  error=>{
                    console.error($t('Fail to create Page Record'),error);
                    Vue.toasted($t('Fail to create Page Record'));
                    _instance.showFullscreenLoader(false);
                  }
                )
        }
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

      currentPreview: 0,

      previous_page_id:"",

      show_select_book: false,
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
