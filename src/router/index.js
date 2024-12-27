import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie'; // 確保導入 Cookies 模組
import HomePage from '@/components/HomePage.vue'; // 首頁組件
import LoginPage from '@/components/LoginPage.vue';
import RoomPage from '@/components/RoomPage.vue';
import NewsPage from '@/components/NewsPage.vue';
import FoodPage from '@/components/FoodPage.vue';
import OrderPage from '@/components/OrderPage.vue';
import ContactusPage from '@/components/ContactusPage.vue';
import ReservationPage from '@/components/ReservationPage.vue';
import RegisterPage from "@/components/RegisterPage.vue";
import CustomerDashboard from '@/components/customer-dashboard.vue';

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
    path: "/register",
    name: "Register",
    component: RegisterPage,
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
  {
    path: '/order',
    name: 'Order',
    component: OrderPage,
        meta: { hideNavbar: true, hideFooter: true, requiresAuth: true}, // 需要登入且只有老闆和主管可以訪問, roles: [4 ] 
  },
  {
    path: '/customer-dashboard',
    name: 'Customer-dashboard',
    component: CustomerDashboard
  },
];

const router = new VueRouter({
  mode: 'history', // 啟用 HTML5 History 模式
  routes,
});

// 全域導航守衛
router.beforeEach((to, from, next) => {
  const token = Cookies.get("token"); // 檢查是否有登入 Token
  const role = parseInt(Cookies.get("role"), 10); // 獲取用戶角色

  // 檢查是否需要登入
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      alert("未登入，請先登入！");
      return next({ path: "/login" }); // 導向登入頁面
    }

    // 檢查角色是否有權限訪問該頁面
    if (to.meta.roles && !to.meta.roles.includes(role)) {
      alert("您沒有權限訪問此頁面！");
      return next({ path: "/" }); // 返回首頁
    }
  }

  // 如果已登入，避免再次訪問登入或註冊頁
  if (to.path === "/login" || to.path === "/register") {
    if (token) {
      alert("您已登入！");
      return next({ path: "/" }); // 導向首頁
    }
  }

  next(); // 繼續導航
});


export default router;
