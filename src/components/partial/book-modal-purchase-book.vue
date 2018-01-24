<template>
  <v-dialog v-model="show" persistent max-width="1500px" >
      <v-container fluid text-xs-center style="background-color:#ffffff;">
        <v-layout row wrap>
          <v-flex xs8>
            <!-- Create a card for displaying the image of the row -->
            <v-layout row wrap >
              <v-flex xs12 sm12 md6 class="left_image"  >
                <book-row-image
                  :all_pages="all_pages"
                  :page="page"
                  :row_height="row_height"
                  :grey="page[`left_greyscale`]"
                  side="left">
                </book-row-image>
              </v-flex>
              <v-flex xs12 sm12 md6 >
                <book-row-image
                  :all_pages="all_pages"
                  :page="page"
                  :row_height="row_height"
                  :grey="page[`right_greyscale`]"
                  side="right">
                </book-row-image>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs2>
            <v-card color="yellow lighten-4">
              <v-container>
                <table class="summary_table">
                  <tr>
                    <td class="attr">{{$t("Teacher Copy")}}</td>
                    <td class="value">{{summary.teacher_copy}}</td>
                  </tr>
                  <tr>
                   <td class="attr">{{$t("Student Copy")}}</td>
                    <td class="value">{{summary.student_copy}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("B&W Pages")}}</td>
                    <td class="value">{{summary.bw_page}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("Color Pages")}}</td>
                    <td class="value">{{summary.color_page}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("Required Edit")}}</td>
                    <td class="value">{{summary.edit_page}}</td>
                  </tr>
                  <tr>
                    <td class="attr">{{$t("Average Price")}}</td>
                    <td class="value">HKD ${{summary.average_price}}</td>
                  </tr>
                </table>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap >
          <v-flex md8>
            <v-pagination
                 :length="Math.ceil(row_record.length)"
                 v-model="current_index"
                 :total-visible="7"
                 @input = "resetPage()"
            ></v-pagination>
            (Total Record:  {{row_record.length}})
          </v-flex>
          <v-flex md4>
            <v-btn color="blue darken-1" flat @click.native="$emit('close_dialog');">
              {{$t("Close")}}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
  </v-dialog>
</template>
<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
  table.summary_table td.attr{
    color:grey;
    font-size: 0.85em;
    text-align: left;
  }
  table.summary_table td.values{
    color:darkolivegreen;
    font-size: 0.95em;
    text-align: left;

  }
</style>
<script>
  import Vue from 'vue'
  import {mapGetters,mapActions} from "vuex"
  import moment from 'moment'
  import { getExtension } from '@/shared/helpers'
  import BookRowImage from "@/components/partial/book-row-image"

  export default{
      name:"BookModalPurchaseBook",
      components:{
        BookRowImage
      },
      props:["show","all_pages", "row_record", "metadata", "summary"],
      data(){
        return{
          current_index:1,
          row_height:550
        }
      },
  methods: {
    ...mapActions([
    ]),
    resetPage()
    {
      console.log(this.all_pages)
    }
    },
  computed:{
    ...mapGetters({
        current_book:"currentBook",
      }),
     page(){
        return this.row_record[this.current_index-1]||{};
      },

    }
  };
</script>

