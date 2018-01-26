<template>
    <v-container grid-list-md >
        <v-layout row wrap>

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
  name: 'OrderManagement',
  created()
  {
      this.getOrder();
  },
  data() {
    return {

    };
  },
  methods: {
    ...mapActions([
      "getOrder"
    ])
  }
};    
</script>
<style scoped>

</style>
