<template>
    <v-card >
        <v-container>
            <v-form  ref="page_meta" lazy-validation>
                <v-layout row wrap>

                    <v-flex xs3>{{$t('Codex')}}</v-flex>
                    <v-flex xs9>
                        <v-select :items="option.codex"
                                    item-value="code"
                                    item-text="label"
                                    v-model="current_page.codex"
                                    @input="pageUpdateOption({type:'codex',values:$event})"
                                    :label="$t('Codex')" editable ></v-select>
                    </v-flex>

                    <v-flex xs3>{{$t('Syllabus')}}</v-flex>
                    <v-flex xs9>
                        <v-select :items="option.syllabus"
                                    item-value="code"
                                    item-text="label"
                                    v-model="current_page.syllabus_code"
                                    @input="pageUpdateOption({type:'syllabus_code',values:$event})"
                                    :label="$t('Syllabus')" editable ></v-select>
                    </v-flex>

                    <v-flex xs3>{{$t('Domain')}}</v-flex>
                    <v-flex xs9>
                        <v-select :items="option.domain"
                                    v-model="current_page.domain"
                                    @input="pageUpdateOption({type:'domain',values:$event})"
                                    :label="$t('Domain')" editable ></v-select>
                    </v-flex>

                    <v-flex xs3>{{$t('Area')}}</v-flex>
                    <v-flex xs9><v-select :items="option.area"
                    v-model="current_page.area"
                                    @input="pageUpdateOption({type:'area',values:$event})"
                                    :label="$t('Area')" editable ></v-select></v-flex>

                    <v-flex xs3>{{$t('Knowledge Unit')}}</v-flex>
                    <v-flex xs9><v-select :items="option.knowledge_unit"
                    v-model="current_page.knowledge_unit"
                                    @input="pageUpdateOption({type:'knowledge_unit',values:$event})"
                                    :label="$t('Knowledge Unit')" editable ></v-select>
                    </v-flex>

                     <v-flex xs3>{{$t('Learning Objective')}}</v-flex>

                    <v-flex xs9>
                        <v-select
                            multiple
                            :items="option.learning_objective"
                            v-model="current_page.learning_objective"
                            @input="pageUpdateOption({type:'learning_objective',values:$event})"
                            :label="$t('Learning Objective')" editable ></v-select>
                    </v-flex>
                    <v-flex xs12 >
                        <v-text-field
                            :label="$t('Particulars')"
                            v-model="current_page.particulars"
                            @input="pageUpdateOption({type:'particulars',values:$event})"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            :label="$t('Level of difficulty')+$t(' - Number')"
                            v-model="current_page.level_of_difficulty"
                            @input="pageUpdateOption({type:'level_of_difficulty',values:$event})"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 >
                        <v-text-field
                            :label="$t('Remark')"
                            v-model="current_page.remark"
                            @input="pageUpdateOption({type:'remark',values:$event})"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs8>
                        <!-- @TODO mapping existing page to previous page, if previous page is exist -->
                        <v-flex>
                            {{$t('Link Previous Page')}}: {{current_page.previous_page_id}}<br>
                        </v-flex>
                        <v-btn @click.stop="$emit('show_select_book')">{{$t('Link Previous Page')}}</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-container>
    </v-card>
</template>
<script>
import Vue from 'vue';
import {mapGetters,mapActions} from "vuex";
// import {syllabus} from "@/store/static-record";
import _ from "lodash";

export default {
  name: "PageDetailForm",
  computed:{
        ...mapGetters({
            current_page:"currentPage",
            option:"PageSyllabusOptions",
        })
  },
  methods: {
      ...mapActions([
          "pageUpdateOption",
          "pageResetOption",
        ]),
        addPreviousPageRecord(){
            //Add Page Record
            //Get Page Record by Page ID

            // Case has multiple pages
        },
        updateSyllabusOption(){

        }
  },
  data(){
      return{
          show_previous_finder:false,
      }
  },
   components:{
   }
}
</script>
