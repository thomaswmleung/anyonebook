// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import Toasted from 'vue-toasted'
// load vuex i18n module
import vuexI18n from 'vuex-i18n';

import {translationsEn, translationsTc} from "@/translations";

import store from '@/store';

import {DEBUG} from '@/env';

Vue.use(Vuex);
Vue.use(Toasted);
// initialize the vuex store using the vuex module. note that you can change the
//  name of the module if you wish
// const store = new Vuex.Store();

// initialize the internationalization plugin on the vue instance. note that
// the store must be passed to the plugin. the plugin will then generate some
// helper functions for components (i.e. this.$i18n.set, this.$t) and on the vue
// instance (i.e. Vue.i18n.set).
Vue.use(vuexI18n.plugin, store,
	 {onTranslationNotFound (locale, key) {
     if(DEBUG){
      console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`);
     }
		
	}});

// add translations directly to the application
Vue.i18n.add('en', translationsEn);
Vue.i18n.add('tc', translationsTc);

// set the start locale to use
Vue.i18n.set('tc');

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VDialog,   
  transitions,
  VTextField,
  VForm,
  VSelect,
} from 'vuetify';
import '../node_modules/vuetify/src/stylus/app.styl'

import App from './App';
import router from './router';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard, 
    VDialog,
    transitions,
    VForm,
    VTextField,
    VSelect
  },
  // theme: {
  //   primary: '#ee44aa',
  //   secondary: '#424242',
  //   accent: '#82B1FF',
  //   error: '#FF5252',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FFC107'
  // }
});

Vue.config.productionTip = true;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
