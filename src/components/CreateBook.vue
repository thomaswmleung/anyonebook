<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4>
                <h2>Create Blank New Book / From Existing Book</h2>
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
 export default {
  name: 'Pagination',
  data() {
    return {
        unit:[],
        page:[],
        meta:{},
        items:[
            "Base on book ID to retrieve book information ",
            "Show TOC, and let user the manipulate",
            "Show Preview and have cost estimation",
            "Show Cover user to edit",
            "Generate preview of the book",
            "emit event for future handling ",            
        ],
        completed:[

        ]
    };
  },
};    
</script>
<style scoped>

</style>
