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
      </v-list>
    </v-navigation-drawer> 
    <v-toolbar app fixed >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <h3>AnyOneBook {{$t($route.name)}}</h3>
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
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: false,
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
        },{
          icon: 'face',
          title: 'Login/Logout',
          path:"login"
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
      };
    },
  };
</script>


