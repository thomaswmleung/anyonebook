<template>
    <v-container grid-list-md >
        <v-layout row wrap>
          
            <v-flex sm10>
                <v-layout row wrap>
                    <v-flex>
                    <v-container>
                        <v-card-title>
                            <h3 class="title">
                                <span>{{$t('SearchPage')}}</span>
                            </h3>
                        </v-card-title>
                        <v-form ref="page_meta" lazy-validation>
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
                           
                                <v-flex xs12 md4><v-select :items="option.area" 
                                v-model="current_page.area"
                                              @input="pageUpdateOption({type:'area',values:$event})"                        
                                              :label="$t('Area')" editable ></v-select></v-flex>
                                <v-flex xs12 md4><v-select :items="option.knowledge_unit" 
                                v-model="current_page.knowledge_unit"
                                              @input="pageUpdateOption({type:'knowledge_unit',values:$event})"                                              
                                              :label="$t('Knowledge Unit')" editable ></v-select></v-flex>                                
                                <v-flex md3>
                                    <v-btn fab dark small color="primary" @click.stop="fetchData">
                                        <v-icon>search</v-icon>
                                    </v-btn>
                                </v-flex>

                            </v-layout>
                        </v-form>
                    </v-container>
                        
                    </v-flex>
                </v-layout>

                <v-layout row wrap >
                    <v-flex md6 v-for="page in all_page" :key="page._id">
                        <v-card>
                            <v-container>
                            PageID - {{page._id}} <br>
                            {{page.title}} {{page.domain}} {{page.subdomain}} <br>
                            {{page.remark}}
                            <router-link :to="`/upload_page/${page._id}`">
                            {{$t('Edit')}}
                            </router-link>
                            </v-container>
                        </v-card>
                    </v-flex> 
                </v-layout> 
                 <v-layout row wrap >
                     <v-flex>
                        Total Record:  {{page_paginator.total_count}}
                     </v-flex>
                 </v-layout>   
            </v-flex>
        </v-layout>
     </v-container>
</template>
<style scoped>
    li.complete {
        background: #DDD;
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
       this.pageResetOption();
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
          "getPages"
        ]),
        fetchData(){
            // fetch the data when the view is created and the data is
            // already being observed
            let paginator = {};
            paginator.limit = this.page_paginator.limit;
            paginator.skip = (this.page_paginator.current_page-1)*this.page_paginator.limit;
            

            let filters = {};
            filters.domain = this.current_page.domain;
            filters.subdomain = this.current_page.area;
            filters.sub_title = this.current_page.knowledge_unit;
            filters.codex = this.current_page.codex;
            filters.layout = this.current_page.syllabus;
            let router  = this.$router;

            this.getPages({paginator,filters,router});
        },
  },
  computed:{      
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",
            page_paginator:"pagePaginator",
            all_page:"allPages"
        })  
  },
  data() {
    return {
    
    };
  }
};
</script>

