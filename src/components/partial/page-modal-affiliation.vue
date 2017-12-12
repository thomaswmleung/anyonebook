<template>
  <v-dialog v-model="show" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{$t('Affiliation')}}
            ({{$t(current_page_affiliation_index==-1?'Add':'Edit')}})
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex xs12 sm6>
                <v-select
                  :label="$t('Publisher')"
                  required
                  chips
                  v-model= "current_page_affiliation.publisher"
                  @input="pageUpdateAffiliation({attr:'publisher',val:$event})"
                  :items="['現代出版社', '教育出版社', '新領域出版社']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :label="$t('Book Name')"                  
                  autocomplete
                  chips
                  v-model = "current_page_affiliation.book_title"
                  @input="pageUpdateAffiliation({attr:'book_title',val:$event})"                  
                  :items="['語文生活', '中文26週', '數學26週', '摘星成長']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :label="$t('Book\'s Edition')"                  
                  autocomplete
                  chips
                 v-model = "current_page_affiliation.edition"
                  @input="pageUpdateAffiliation({attr:'edition',val:$event})" 
                  :items="['2016 P5 A', '2016 P5 B', '2016 P4 A', '2016 P4 B']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  :label="$t('Book Unit Title')"                  
                  autocomplete
                  chips
                  v-model = "current_page_affiliation.unit"
                  @input="pageUpdateAffiliation({attr:'unit',val:$event})" 
                  :items="['第一課', '第二課', '第三課', '第四課']"
                ></v-text-field>
              </v-flex>
               <v-flex xs6 sm3>
                <v-text-field
                  :label="$t('Page Number')"                  
                  autocomplete
                  chips
                  v-model = "current_page_affiliation.page_number"
                  @input="pageUpdateAffiliation({attr:'page_number',val:$event})" 
                ></v-text-field>
              </v-flex>
              <v-flex xs6 sm9>
                <v-text-field
                  :label="$t('Remark')"                  
                  autocomplete
                  chips
                   v-model= "current_page_affiliation.remark"
                  @input="pageUpdateAffiliation({attr:'remark',val:$event})" 
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*{{$t("indicates required field")}}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');pageResetAffiliation()">{{$t("Close")}}</v-btn>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');pagePushOrModifyAffiliationArray()">
            {{$t(current_page_affiliation_index==-1?'Add':'Edit')}}            
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
export default{
  name:"PageModalAffiliation",
  props:["show"],
  data(){
    return{

    }
  },
  methods:{
     ...mapActions([
       "pageUpdateAffiliation",
       "pageUpdateAffiliationIndex",
       "pageResetAffiliation",
       "pagePushOrModifyAffiliationArray"
      ]),
  }
  ,computed:{      
        ...mapGetters({
            option:"PageSyllabusOptions",
            current_page:"currentPage",
            current_page_affiliation_index:"currentPageAffiliationIndex", 
            current_page_affiliation:"currentPageAffiliation",  
        })
  }
}
</script>
