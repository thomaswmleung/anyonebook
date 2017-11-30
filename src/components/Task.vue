<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4>
                <h2>Here is the to do list </h2>
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
            "Http controller, API integration with backend",
            "Design the UI logic for Page row and Unit",
            "Handle Drag and drop event",
            "Add button within page row with hide and show logic ",
            "receive record from props, page record, unit record  ",
            "emit event for future handling ",
            
            "Using Vuex as state management,split into module common, pagination, order, user",
            "Using Page attribute to navigate the page",
            "i18n Language integration"
        ],
        completed:[
            "using Vuetify layout",

        ]
    };
  },
};    
</script>
<style scoped>

</style>
