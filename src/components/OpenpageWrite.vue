<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4>
                <h2>OpenPageWrite</h2>
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
                                <p>Provide a web form for user to create / edit page online line</p>
                                <p>Different QuestionType would have different web form to handle various attributes</p>
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
            "Break down the page into JSON object",
            "UI for handling different Question Type",
        ],
        completed:[
            
        ]
    };
  },
};    
</script>
<style scoped>

</style>
