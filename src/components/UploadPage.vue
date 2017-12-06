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
                                              :label="$t('Codex')" editable ></v-select>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select :items="option.syllabus" 
                                              item-value="code"
                                              item-text="label"
                                              :label="$t('Syllabus')" editable ></v-select>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select :items="option.domain" 
                                              item-value="code"
                                              item-text="label"
                                              :label="$t('Domain')" editable ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4><v-select :items="option.area" 
                                              item-value="code"
                                              item-text="label"
                                              :label="$t('Area')" editable ></v-select></v-flex>
                                <v-flex xs12 md4><v-select :items="option.knowledge_unit" 
                                              item-value="code"
                                              item-text="label"
                                              :label="$t('Knowledge Unit')" editable ></v-select></v-flex>                                
                                 <v-flex xs12 md4>
                                    <!-- @TODO mapping existing page to previous page, if previous page is exist -->
                                    <v-btn>{{$t('Previous Page')}}</v-btn>
                                </v-flex>              
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex md12>
                                    <!-- Handle Affiliation -->
                                    <h4 class="subtitle">
                                        <span>{{$t('Affiliation')}}</span>
                                        <v-btn fab dark small primary @click.stop="addAffilication">
                                            <v-icon >add</v-icon>
                                        </v-btn>
                                    </h4>                                    
                                    <!--For Loop of all Affiliation Item-->
                                </v-flex>
                                <v-flex md12>
                                    <v-layout row wrap>
                                        <v-flex md4></v-flex>
                                        <v-flex md4></v-flex>
                                        <v-flex md4></v-flex>
                                    </v-layout>
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
     </v-container>
</template>
<style scoped>
li.complete {
  background: #ddd;
}
</style>

<script>
export default {
  name: "Pagination",
  methods: {
    //Upload PDF process - trigger 
        uploadPDF() {
        console.log("Upload PDF");
        //Show
        },
    //Process PDF upload 
        processPDF(){

        },
    //Add Page Record
        addPageRecord(){

        },
        addAffilication(){

        }
  },
  data() {
    return {
      valid: "",
      uploadIcon:"attachment",
      showTaskItem: false,
      selectedPDF: {},
      option: {
        codex: [
            { code: "chinese_learn_free", label: "語文自由識" },
            { code: "math_learn_free", label: "數學自由識" },
        ],
        syllabus: [{ code: "hk_primary_chinese_2015", label: "香港小學中文  2015" }],
        domain: [],
        area: [],
        knowledge_unit: [],
        user: [
          { code: "A", label: "answer" },
          { code: "S", label: "Student Un-coded" },
          { code: "R", label: "Student Coded" },
          { code: "U", label: "Teacher Un-coded" },
          { code: "T", label: "Teacher Coded" }
        ],
        level: [
          { code: "G", label: "Top Gun" },
          { code: "H", label: "High Baseline" },
          { code: "B", label: "Baseline" },
          { code: "F", label: "Support with Scaffolding" },
          { code: "D", label: "Indeterminate" },
          { code: "O", label: "Open Graphic" }
        ],
        nature: [
          { code: "P", label: "Paper or Text" },
          { code: "Q", label: "Question" },
          { code: "N", label: "Comprehension" },
          { code: "M", label: "Exam or Test" }
        ],
        position: [
          { code: "V", label: "Inside Page" },
          { code: "W", label: "Cover" },
          { code: "X", label: "Inside Cover" },
          { code: "Y", label: "Page One" },
          { code: "Z", label: "Back Cover" }
        ],
        output: [
          { code: "C", label: "Color" },
          { code: "K", label: "Black/White" }
        ]
      },
      items: [
        "Web form to upload page",
        "Handle Media API with modal and Form, Update API to handle PDF page",
        "Upload multiple PDF into same PDF Page file",
        "Add modal popup for previous page handling"
      ],
      completed: []
    };
  }
};
</script>
<style scoped>

</style>
