import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/components/HomePage.vue'; // 首頁組件
import LoginPage from '@/components/LoginPage.vue'; // 確保路徑正確
import AboutPage from '@/components/AboutPage.vue';
import RoomPage from '@/components/RoomPage.vue';
import NewsPage from '@/components/NewsPage.vue';
import FoodPage from '@/components/FoodPage.vue';
import ContactusPage from '@/components/ContactusPage.vue';
import ReservationPage from '@/components/ReservationPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage, // 登入頁面組件
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage, // 確保這裡正確引入 AboutPage 組件
  },
  {
    path: '/room',
    name: 'Room',
    component: RoomPage, // 確保這裡正確引入 RoomPage 組件
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage, // 確保這裡正確引入 AboutPage 組件
  },
  {
    path: '/food',
    name: 'Food',
    component: FoodPage, // 確保這裡正確引入 AboutPage 組件
  },
  {
    path: '/contactus',
    name: 'Contactus',
    component: ContactusPage, // 確保這裡正確引入 AboutPage 組件
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: ReservationPage, // 確保這裡正確引入 AboutPage 組件
  },
];

const router = new VueRouter({
  mode: 'history', // 啟用 HTML5 History 模式
  routes,
});

export default router;
