<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex md3>
                <h2>Create Blank New Book / From Existing Book</h2>
            </v-flex>
            <v-flex md9>
                <v-layout row wrap>
                    <v-flex v-for="(unit,idx) in units" :key="unit.domain+unit.subdomain">
                        {{idx}} {{unit}}
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
        units:[],
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
