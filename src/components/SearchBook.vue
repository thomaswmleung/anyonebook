<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4>
                <h2>Search Book </h2>
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
                        
          <v-btn color="blue darken-1" flat @click.native="deleteBooks">
            {{$t('Delete')}}
          </v-btn>
                    </v-flex>
                    <v-flex xs4>
                        Try
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
 import {mapGetters,mapActions} from "vuex"
  import moment from 'moment' 

 export default {
  name: 'Pagination',
  data() {
    return {
        unit:[],
        page:[],
        meta:{},
        items:[
            "Codex List",
            "Public Book from the Codex, Different Textbook will have different Books",
            "Get User books"
        ],
        completed:[
        ]
    };
  },
   methods: {
    ...mapActions([
      "deleteBook"
    ]),

    deleteBooks()
    {
        let book = {};
        book._id = "5a5877b9759b741cb12e25e3";
        this.deleteBook({book});
    }
    }
};    
</script>
<style scoped>

</style>
