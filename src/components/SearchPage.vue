<template>
    <v-container grid-list-md >
        <v-layout row wrap>

            <v-flex sm10>
                <v-layout row wrap>
                    <v-flex xs12>
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

                                  <v-flex xs12 md4><v-select :items="option.learning_objective"
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
                    <v-flex md3 v-for="page in all_page" :key="page._id">
                        <v-card>
                            <v-container>
                            <!-- PageID - {{page._id}} <br>
                            {{page.title}} {{page.domain}} {{page.subdomain}} <br>
                            {{page.remark}} {{page.created_at}} <br>
                            <v-flex v-if="page.preview_image_array">
                              <v-carousel v-if="page.preview_image_array.length == 1" hide-delimiters>
                                <v-carousel-item v-for="item in page.preview_image_array" v-bind:src="item" :key="item._id" cycle="false"></v-carousel-item>
                              </v-carousel>
                              <v-carousel v-if="page.preview_image_array.length > 1">
                                <v-carousel-item v-for="item in page.preview_image_array" v-bind:src="item" :key="item._id" cycle="false"></v-carousel-item>
                              </v-carousel>
                            </v-flex> -->
                            <v-layout row wrap>
                              <v-flex xs12>
                                <span style="color:darkblue;font-weight:bold;font-size:1.2em;">{{page.domain}}</span>
                                <span style="color:darkblue;font-weight:bold;font-size:1.2em;">{{page.subdomain}} </span><br/>
                                <span style="color:lightblue;font-weight:bold;font-size:0.7em;">{{page.learning_objective[1]}}</span><br/>
                                <span style="color:darkgray;font-size:0.7em">{{page.created_at}} </span><br/>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs12>
                                <div class="viewer-wrapper" >
                                  <viewer :options="options" :images="[getPageImage(page)]"
                                          class="viewer" ref="viewer"
                                  >
                                    <template slot-scope="scope">
                                      <figure class="images">
                                        <div class="image-wrapper" style="text-align: center;">
                                          <img class="image bw"
                                              :src="getPageImage(page)"
                                              :data-source="getPageImage(page)"
                                              :style="{width:'95%'}"
                                          >
                                        </div>
                                      </figure>
                                    </template>
                                  </viewer>
                                </div>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs6>
                                <router-link :to="`/upload_page/${page._id}`" tag="button">
                                  <v-btn color="primary" small>{{$t('Edit')}}</v-btn>
                                </router-link>
                              </v-flex>
                              <v-flex xs6>
                                <v-btn color="error" small
                                  @click.stop="deletePage({page});fetchData()">{{$t('Delete')}}
                                </v-btn>
                              </v-flex>
                            </v-layout>
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
</template>
<style scoped>
    li.complete {
        background: #DDD;
    }


.viewer-wrapper {
    position: relative;
    background: #333;
    height: 100%;
  }
  .methods {
    margin-bottom: 1em;
    flex-wrap: wrap;
    & > * {
      margin-right: 0.75rem;
    }
  }
  .options-panel {
    .panel-block {
      padding: 0;
      .checkbox {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0.5em 0.75em;
      }
    }
  }
  .viewer {
    height: 100%;
    .images {
      width:100%;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px;
      .image-wrapper {
        display: inline-block;
        width: calc(33% - 20px);
        margin: 5px 5px 0 5px;
        .image {
          width: 100%;
          cursor: pointer;
          display: inline-block;
        }
      }
    }
  }
</style>

<script>
import Vue from 'vue';
import {mapGetters,mapActions} from "vuex";
// import {syllabus} from "@/store/static-record";
import _ from "lodash";

export default {
  name: "Pagination",
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
          "pageUpdateVersionIndex",
          "pageDeleteVersion",
          "getPageById",
          "pageResetOption",
          "getPages",
          "deletePage"
        ]),
        getPageImage(pageObj){
            let imgSrc = "";
            //Get URL from an Array
            console.log(pageObj);
            if(pageObj.versions
              && typeof pageObj.versions == "object"
              && pageObj.versions.length >0
            ){
              imgSrc = pageObj.versions[0].students_preview_image;
            }
            return imgSrc;
        },
        fetchData(){
            this.pageUpdateOption({type:'codex',values:"mathany"})
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
  data() {
    return {
      options:{"inline": true, "button": true, "navbar": false, "title": false, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": false, "scalable": false, "transition": false, "fullscreen":true, "keyboard": false},
      dialog: false,
      menuStartDate: false,
      menuEndDate: false,
      startDate: null,
      endDate: null
    };
  }
};
</script>

