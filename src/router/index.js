import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Task from '@/components/Task';
import UploadPage from '@/components/UploadPage';
import SearchPage from '@/components/SearchPage';
import CreateBook from '@/components/CreateBook';
import SearchBook from '@/components/SearchBook';
import UserProfile from '@/components/UserProfile';
import OrderManagement from '@/components/OrderManagement';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path:"/tasks",
      name:'Task',
      component:Task,
    },
    {
      path:"/upload_page",
      name:'UploadPage',
      component:UploadPage,
    },
    {
      path:"/search_page",
      name:'SearchPage',
      component:SearchPage,
    },
    {
      path:"/create_book",
      name:'CreateBook',
      component:CreateBook,
    },
    {
      path:"/search_book",
      name:'SearchBook',
      component:SearchBook,
    },
    {
      path:"/user_profile",
      name:'UserProfile',
      component:UserProfile,
    },
    {
      path:"/order_management",
      name:'OrderManagement',
      component:OrderManagement,
    },
    {
      path:"/login",
      name:'Login',
      component:Login,
    }
  ],
});
