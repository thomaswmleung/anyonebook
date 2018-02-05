<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4>
                <h2>EnagementForm</h2>
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
                    </v-flex>
                    <v-flex xs4>
                        <v-card>
                            <div style="padding:2.2em">
                                <p>Using Public SMTP gateway</p>
                                <p>School name and ID is preset in tsv files</p>
                            </div>
                        </v-card>
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
 export default {
  name: 'OpenPageWrite',
  data() {
    return {
        unit:[],
        page:[],
        meta:{},
        items:[
            "Check User Role before access",
            "List the required edit by school",
            "table for list all require edit pages in particular book",
            "Email Notice when all page is modified ",
            "When School confirm all page is updated, the TOC book will be update",

        ],
        completed:[

        ]
    };
  },
};
</script>
<style scoped>

</style>
