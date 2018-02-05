<template>
  <v-container>
    <v-layout>
        <v-flex md12>
          <v-btn color="primary" @click="add()">Add</v-btn>
          <!-- <v-btn color="warning">Edit</v-btn>-->
          <v-btn color="secondary" @click="selected={}">Cancel</v-btn>
        </v-flex>
    </v-layout>
    <!-- list -->
    <v-layout row wrap>
      <v-flex sm3>
        <v-list two-line>
          <template v-for="item in items" >
              <v-list-tile-content
                class="line-item"
                :key="item.title"
                :class="{active:item[attributes[0]]==selected[attributes[0]]}"
                @click="selected=item"
              >
                <v-list-tile-title v-html="`${item[attributes[0]]}`"></v-list-tile-title>
                <div
                  v-for="(opt,index) in attributes"
                  :key="opt"
                  v-if="index > 0"
                  style="color:darkgrey;font-weight:bold;font-size:0.9em"
                > {{item[attributes[index]]}} </div>
              </v-list-tile-content>
          </template>
        </v-list>
      </v-flex>
      <v-flex sm8>
        <v-form>
          <v-text-field
            v-for="attr in attributes"
            :key = "attr"
            v-model="selected[attr]"
            :label="attr"
          >

          </v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <!-- add / edit (with Cancel / )-->
    <!-- delete -->
  </v-container>
</template>

<style scoped>
.active{
  background-color: lightyellow;
  font-size:1.2em;
  padding:0.2em;
}
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
      select(index){
        this.selected = _.cloneDeep(this.items[index]);
      },
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
        mode:"list"
      }
    }
  }
</script>
