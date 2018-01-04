<template>
      <v-container grid-list-md >        
        <v-layout row wrap>
            <v-flex md12 >
            </v-flex>
        </v-layout>
     </v-container>
</template>
<style scoped>

</style>
<script>
    import Vue from 'vue'
    import {mapGetters,mapActions} from "vuex"
    import moment from 'moment' 
    export default{
        name:"PageModalPreviousFinder",
        props:["show"],
        components:{
            
        },
        methods:{
            ...mapActions([])
        },
        computed:{      
            ...mapGetters({})
        }
    }   
</script>
