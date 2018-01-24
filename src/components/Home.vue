<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12>
        <h3 class="title">{{$t('AnyOneBook Introduction')}}</h3>
      </v-flex>
    </v-layout>
     <v-layout row wrap>
      <v-flex md12 style="height:0px;overflow:hidden">
         <div class="mermaid" >
          graph TB
              complete_payment-->alert_owner
              owner-->owner_action
              fund_transfer-->owner
              subgraph Buyer
                buyer(Buyer) --> buyer_reg(User Registration, buyer)
                buyer_reg-->buyer_look4_shop(Finding the Shop)
                buyer_look4_shop-->create_order(Create Order)
                create_order-->complete_payment(Payment to Look4Crypto)
              end
              subgraph Look4Crypto Platform
                alert_owner(Alert Owner for new Order)-->owner_action(Owner transfer the token )
                owner_action-->platform_validation(Platform Confirm the token transaction)
                platform_validation -->fund_transfer(Transfer fund to Owner)
                fund_transfer-->order_compelete(Order Complete)

              end

              subgraph Token Owner
                owner(Token Owner) --> owner_reg(User Registration, Owner)
                owner_reg-->shop(Setup Shop)
                shop-->owner_accept(Accept Order)
              end




          </div>

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md12>
        <video width="50%" controls>
          <source src="http://www.ilearnersopenpage.com/videos/mp4/intro.mp4" type="video/mp4">
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
          <source src="http://www.ilearnersopenpage.com/videos/mp4/pagination.mp4"  type="video/mp4">
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
          <source src="http://www.ilearnersopenpage.com/videos/mp4/adaptivebook.mp4" type="video/mp4">
          <source src="http://www.ilearnersopenpage.com/videos/mp4/adaptivebook.webm" type="video/webm">
          Your browser does not support HTML5 video.
        </video>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import mermaid from "mermaid";
export default {

  name: 'Home',
  data() {
    return {
    };
  },
  mounted(){
    // console.log(mermaid);
    mermaid.initialize({startOnLoad:true});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
