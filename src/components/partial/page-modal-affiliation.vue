<template>
  <v-dialog v-model="show" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('Affiliation')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex xs12 sm6>
                <v-select
                  :label="$t('Publisher')"
                  required
                  chips
                  :items="['現代出版社', '教育出版社', '新領域出版社']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :label="$t('Book Name')"                  
                  autocomplete
                  chips
                  :items="['語文生活', '中文26週', '數學26週', '摘星成長']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :label="$t('Book\'s Version')"                  
                  autocomplete
                  chips
                  :items="['2016 P5 A', '2016 P5 B', '2016 P4 A', '2016 P4 B']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :label="$t('Book Unit Title')"                  
                  autocomplete
                  chips
                  :items="['2016 P5 A', '2016 P5 B', '2016 P4 A', '2016 P4 B']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*{{$t("indicates required field")}}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog')">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default{
  name:"PageModalAffiliation",
  props:["show"],
  data(){
    return{

    }
  }
}
</script>
