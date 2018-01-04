<template>
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
            <v-card color="lime lighten-4">
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
        <page-modal-affiliation 
            :show="show_affiliation"
            @close_dialog = "show_affiliation=false">
        </page-modal-affiliation>
    </v-layout>
</template>


<script>
import Vue from 'vue';
import {mapGetters,mapActions} from "vuex";
// import {syllabus} from "@/store/static-record";
import _ from "lodash";

import PageModalAffiliation from "@/components/partial/page-modal-affiliation"

export default {
  name: "PageAffiliationList",
  computed:{      
        ...mapGetters({
            current_page:"currentPage",
            current_page_affiliation_index:"currentPageAffiliationIndex",  
        })  
  },
  methods: {
      ...mapActions([
          "pageUpdateAffiliationIndex",
          "pageDeleteAffiliation",
        ]),

        addAffilication(index){
            //show modal  
            this.show_affiliation = true;
            //format the parameter and update the action 
            this.pageUpdateAffiliationIndex(index);
        }, 
  },
  data(){
      return{
          show_affiliation:false,
      }
  },
   components:{
      PageModalAffiliation,
   }
}
</script>