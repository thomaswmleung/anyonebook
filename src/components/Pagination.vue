<template>
    <div>
        <h2>Here is the to do list </h2>
        <ul>
            <li>Design the UI logic for Page row and Unit </li>
            <li>Handle Drag and drop event</li>
            <li>Add button within page row with hide and show logic </li>
            <li>receive record from props, page record, unit record  </li>
            <li>emit event for future handling </li>
            <li>using Vuetify layout</li>
            <li>Using Vuex as state management,split into module common, pagination, order, user</li>
            <li>Using Page attribute to navigate the page</li>
            <li>Http controller</li>
            <li>i18n Language integration</li>
        </ul>
        
    </div>
</template>
<script>
 export default {
  name: 'Pagination',
  data() {
    return {
        unit:[],
        page:[],
        meta:{}
    };
  },
};    
</script>
<style scoped>

</style>
