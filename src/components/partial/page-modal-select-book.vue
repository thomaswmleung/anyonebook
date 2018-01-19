<template>
  <v-dialog v-model="show" persistent max-width="950px">
  <v-card>
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
                                              @input="pageUpdateOption({type:'syllabus_code',values:$event})"
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
                                              :label="$t('Area')" editable ></v-select>
                                </v-flex>

                                <v-flex xs12 md4><v-select :items="option.knowledge_unit"
                                v-model="current_page.knowledge_unit"
                                              @input="pageUpdateOption({type:'knowledge_unit',values:$event})"
                                              :label="$t('Knowledge Unit')" editable ></v-select>
                                </v-flex>

                                <v-flex xs12 md4><v-select multiple :items="option.learning_objective"
                                v-model="current_page.learning_objective"
                                              @input="pageUpdateOption({type:'learning_objective',values:$event})"
                                              :label="$t('Learning Objective')" editable ></v-select>
                                </v-flex>

                                <v-flex xs12 md4>
                                  <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="menuStartDate"
                                    offset-y
                                    full-width
                                  >
                                    <v-text-field
                                      slot="activator"
                                      label="From Date"
                                      v-model="current_page.startDate"
                                    ></v-text-field>
                                    <v-date-picker v-model="startDate" @input="current_page.startDate = startDate" no-title scrollable actions>
                                      <template slot-scope="{ save, cancel }">
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn flat color="primary" @click="cancel">{{$t('Cancel')}}</v-btn>
                                          <v-btn flat color="primary" @click="save">OK</v-btn>
                                        </v-card-actions>
                                      </template>
                                    </v-date-picker>
                                  </v-menu>
                                </v-flex>


                                <v-flex xs12 md4>
                                  <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="menuEndDate"
                                    offset-y
                                    full-width
                                  >
                                    <v-text-field
                                      slot="activator"
                                      label="To Date"
                                      v-model="current_page.endDate"
                                    ></v-text-field>
                                    <v-date-picker v-model="endDate" @input="current_page.endDate = endDate" no-title scrollable actions>
                                      <template slot-scope="{ save, cancel }">
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn flat color="primary" @click="cancel">{{$t('Cancel')}}</v-btn>
                                          <v-btn flat color="primary" @click="save">OK</v-btn>
                                        </v-card-actions>
                                      </template>
                                    </v-date-picker>
                                  </v-menu>
                                </v-flex>
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
                            {{page.remark}} {{page.created_at}} <br>
                            <v-flex v-if="page.preview_image_array">
                              <v-carousel v-if="page.preview_image_array.length == 1" hide-delimiters>
                                <v-carousel-item v-for="item in page.preview_image_array" v-bind:src="item" :key="item._id" cycle="false"></v-carousel-item>
                              </v-carousel>
                              <v-carousel v-if="page.preview_image_array.length > 1">
                                <v-carousel-item v-for="item in page.preview_image_array" v-bind:src="item" :key="item._id" cycle="false"></v-carousel-item>
                              </v-carousel>
                            </v-flex>
                            <v-btn color="error" @click.native="$emit('update_previous_page_id', page._id); $emit('close_dialog');">{{$t('Select')}}</v-btn>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
                 <v-layout row wrap >
                     <v-flex>
                        <v-pagination :length="Math.ceil(page_paginator.total_count/page_paginator.limit)" v-model="page_paginator.current_page" @input="fetchData"></v-pagination>
                        (Total Record:  {{page_paginator.total_count}})
                     </v-flex>
                 </v-layout>


            </v-flex>
        </v-layout>
     </v-container>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');pageResetVersion()">
      {{$t("Close")}}
    </v-btn>
  </v-card-actions>

  </v-card>
   </v-dialog>
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

export default {
  name: "PageModalSelectBook",
  components:{

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
          "getPages",
          "deletePage"
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
            filters.learning_objective = this.current_page.learning_objective;
            filters.startDate = this.current_page.startDate;
            filters.endDate = this.current_page.endDate;
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
  props:["show"],
  data() {
    return {
      dialog: false,
      menuStartDate: false,
      menuEndDate: false,
      startDate: null,
      endDate: null
    };
  }
};
</script>

