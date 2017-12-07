<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12>
        <h3 class="title">{{$t('AnyOneBook Introduction')}}</h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md12>
        <video width="50%" controls>
          <source src="http://www.ilearnersopenpage.com/videos/mp4/intro.mp4"" type="video/mp4">
          <source src="http://www.ilearnersopenpage.com/videos/mp4/intro.webm" type="video/webm">
          Your browser does not support HTML5 video.
        </video>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md12>
        <h3 class="title">{{$t('Pagination')}}</h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md12>
        <video width="50%" controls>
          <source src="http://www.ilearnersopenpage.com/videos/mp4/pagination.mp4"" type="video/mp4">
          <source src="http://www.ilearnersopenpage.com/videos/mp4/pagination.webm" type="video/webm">
          Your browser does not support HTML5 video.
        </video>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md12>
        <h3 class="title">{{$t('AdaptiveBooks')}}</h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md12>
        <video width="50%" controls>
          <source src="http://www.ilearnersopenpage.com/videos/mp4/adaptivebook.mp4"" type="video/mp4">
          <source src="http://www.ilearnersopenpage.com/videos/mp4/adaptivebook.webm" type="video/webm">
          Your browser does not support HTML5 video.
        </video>
      </v-flex>
    </v-layout>    

  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
