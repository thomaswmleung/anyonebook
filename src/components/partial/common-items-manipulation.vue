<template>
  <v-container>
    <!-- list -->
    <!-- add / edit (with Cancel / )-->
    <!-- delete -->
  </v-container>
</template>

<style scoped>
</style>
<script>
  import Vue from 'vue';
  import _ from "lodash";
  import {createUUID} from "@/util";
  export default {
    name: "CommonItemsManipulation",
    props:[
      "items", //Collection of the Object
      "attributes", //Array of attributes object
      "options",//Object with key as attribute name
    ],
    computed:{},
    methods:{
      //will emit @change event for all add/edit/remove action
      add(){
        let inputArray = _.cloneDeep(this.items);
        inputArray.push(this.selected);
        this.$emit("change",inputArray);
      },
      edit(index){
        let inputArray = _.cloneDeep(this.items);
        inputArray[index] = this.selected;
        this.$emit("change",inputArray);
      },
      remove(index){
        let inputArray = _.cloneDeep(this.items);
        this.$emit("change",inputArray.splice(index,1));
      },
      reset(){
        this.selected = {};
      }
    },
    data(){
      return{
        selected:{},
        mode:{}
      }
    }
  }
</script>
