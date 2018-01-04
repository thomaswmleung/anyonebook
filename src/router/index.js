import Vue from 'vue';
import Router from 'vue-router';
import { authenticated, guest } from '@/shared/auth-service'
// import Home from '@/components/Home';
// import Task from '@/components/Task';
// import UploadPage from '@/components/UploadPage';
// import SearchPage from '@/components/SearchPage';
// import CreateBook from '@/components/CreateBook';
// import SearchBook from '@/components/SearchBook';
// import UserProfile from '@/components/UserProfile';
// import OrderManagement from '@/components/OrderManagement';
// import Login from '@/components/Login';

Vue.use(Router);

function load (component) {
  return () => System.import(`@/components/${component}.vue`)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: load('Home'),
    },
    {
      path:"/tasks",
      name:'Tasks',
      component:load('Task'),
    },
    {
      path:"/upload_page/:id?",
      name:'UploadPage',
      component:load('UploadPageV2'),
      beforeEnter:authenticated
    },
    {
      path:"/search_page",
      name:'SearchPage',
      component:load('SearchPage'),
    },
    {
      path:"/create_book",
      name:'CreateBook',
      component:load('CreateBook'),
      beforeEnter:authenticated
    },
    {
      path:"/search_book",
      name:'SearchBook',
      component:load('SearchBook'),
    },
    {
      path:"/user_profile",
      name:'UserProfile',
      component:load('UserProfile'),
      beforeEnter:authenticated
    },
    {
      path:"/order_management",
      name:'OrderManagement',
      component:load('OrderManagement'),
      beforeEnter:authenticated
    },
    {
      path:"/login",
      name:'Login',
      component:load('Login'),
      beforeEnter: guest
    }
  ],
});
