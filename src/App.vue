<template>
  <v-app light>
    <!-- -->
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          value="true"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
             <router-link :to="item.path">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <!-- Logout button -->
        <v-list-tile v-if="authenticated">
          <v-list-tile-action>
            <v-icon light v-html="'exit_to_app'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <a href="#" @click.stop="authLogout($router)">
              <v-list-tile-title v-text="$t('Logout')"></v-list-tile-title>
            </a>
          </v-list-tile-content>
        </v-list-tile>

        <!-- Login Button -->
        <v-list-tile v-if="!authenticated">
          <v-list-tile-action>
            <v-icon light>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
             <router-link to="/login">
            <v-list-tile-title >{{$t('Login')}}</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      
    </v-navigation-drawer> 
    <v-toolbar app fixed >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <h3>AnyOneBook － {{$t($route.name)}}</h3>
      <v-btn flat @click.stop="$i18n.set('tc')">中文</v-btn>
      <v-btn flat @click.stop="$i18n.set('en')">English</v-btn>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn> -->
     
    </v-toolbar>
    <v-content>
      <v-container flex>
        <!-- <v-slide-y-transition mode="out-in"  v-for="n in 10" key="n">
          <v-layout column align-center>
            <img src="static/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote>
              &#8220;First, solve the problem. Then, write the code.&#8221;
              <footer>
                <small>
                  <em>&mdash;John Johnson {{n}}</em>
                </small>
              </footer>
            </blockquote>
          </v-layout>
        </v-slide-y-transition> -->
         <router-view></router-view>
      </v-container>
    </v-content>
    <!-- <v-navigation-drawer
      temporary
      fixed
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer :fixed="fixed" app>
      <span>Copyright&copy; {{ new Date().getFullYear() }} </span>
      <span> iLearners Publishing Limited. All rights reserved.   </span> 
      <a href="http://www.ilearners.hk/privacy.php" target="_blank" style="margin-left:1.2em"> {{$t('Privacy Policy')}} </a> 
      <a href="http://www.ilearners.hk/legal.php" target="_blank" style="margin-left:1.2em"> {{$t('Legal Notice')}} </a>         
    </v-footer>
  </v-app>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: true,
        items: [
          {
          icon: 'home',
          title: 'Home',
          path:"/"
        },
          {
          icon: 'bubble_chart',
          title: 'Tasks',
          path:"tasks"
        },{
          icon: 'file_upload',
          title: 'Upload Page',
          path:"upload_page"
        },{
          icon: 'find_in_page',
          title: 'Search Page',
          path:"search_page"
        },{
          icon: 'open_in_new',
          title: 'Create Book from Codex',
          path:"create_book"
        },{
          icon: 'book',
          title: 'Search Books',
          path:"search_book"
        },{
          icon: 'account_box',
          title: 'User Profile',
          path:"user_profile"
        },{
          icon: 'description',
          title: 'Order Management',
          path:"order_management"
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
      };
    },
    computed:{
        ...mapGetters([
          "authenticated"
        ])
    },
    methods:{
      ...mapActions(["authLogout",'authUserDetect'])
    },
    created(){
       //If User Already Login Update the LocalStorage 
       this.authUserDetect();
    }
  };
</script>
<style>
 a:link {
    text-decoration: none;
    color:grey;
}

a:visited {
    text-decoration: none;
    color: darkgrey;
}

a:hover {
    text-decoration: underline;
}

a:active {
    text-decoration: underline;
}
</style>


