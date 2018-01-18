<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs4>
                <h2>Order Management </h2>
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
                            <div style="padding:.8em">
                                <p>Connected with backend ERP system</p>
                                <p>Using ERP System to create package in each order</p>
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
  name: 'Pagination',
  data() {
    return {
        unit:[],
        page:[],
        meta:{},
        items:[
            "Get Order list by the user",
            "Review the Order Detail"
        ],
        completed:[
            
        ]
    };
  },
};    
</script>
<style scoped>

</style>
