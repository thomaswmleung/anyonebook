<template>
  <v-dialog v-model="show" persistent max-width="950px">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs2>
          <v-card>
            <v-switch
              :label="$t('Edit')"
              v-model="edit1"
            ></v-switch>
            <v-switch
              label="Black/White"
              v-model="bw1"
            ></v-switch>
            <v-switch
              label="Color"
              v-model="color1"
            ></v-switch>
          </v-card>
        </v-flex>
        <v-flex xs4 v-for="page in all_page" :key="page._id">
          <v-card>
            <v-container>
              PageID - {{page._id}} <br>
              {{page.title}} {{page.domain}} {{page.subdomain}} <br>
              {{page.remark}}
              <v-carousel>
                <v-carousel-item v-for="item in page.preview_image_array" v-bind:src="item" :key="item._id" cycle="false"></v-carousel-item>
              </v-carousel>
              <router-link :to="`/upload_page/${page._id}`">
                {{$t('Edit')}}
              </router-link>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs2>
          <v-card>
            <v-switch
              :label="$t('Edit')"
              v-model="edit2"
            ></v-switch>
            <v-switch
              label="Black/White"
              v-model="bw2"
            ></v-switch>
            <v-switch
              label="Color"
              v-model="color2"
            ></v-switch>
          </v-card>
        </v-flex>
        <v-layout row wrap >
          <v-flex>
            <v-pagination :length="Math.ceil(page_paginator.total_count/2)" v-model="page_paginator.current_page" @input="fetchData"></v-pagination>
            (Total Record:  {{page_paginator.total_count}})
          </v-flex>
        </v-layout>
      </v-layout>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');pageResetVersion()">
            {{$t("Close")}}
          </v-btn>
      </v-card-actions>
  </v-container>
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
      name:"PageModalPreviewBook",
      components:{
        
      },
      props:["show"],
      data(){
        return{
          edit1:false,
          edit2:false,
          bw1:false,
          bw2:false,
          color1:false,
          color2:false
        }
      },created () {
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
            paginator.limit = 2;
            paginator.skip = (this.page_paginator.current_page-1)*2;


            let filters = {};
            filters.domain = this.current_page.domain;
            filters.subdomain = this.current_page.area;
            filters.sub_title = this.current_page.knowledge_unit;
            filters.codex = this.current_page.codex;
            filters.layout = this.current_page.syllabus;
            filters.learning_objective = this.current_page.learning_objective;
            let router  = this.$router;

            this.getPages({paginator,filters,router});
        },
  },
  computed:{
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",
            page_paginator:"pagePaginator",
            all_page:"allPages",
            area_row:""
        })
  },
  data() {
    return {

    };
  }
};
</script>

