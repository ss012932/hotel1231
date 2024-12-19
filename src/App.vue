<template>
  <div id="app">
    <!-- 載入畫面 -->
    <div id="loading-screen" class="loading-screen" v-show="isLoading">
      <div class="logo-circle">
        <img src="@/assets/AW LOGO.png" alt="Hotel Logo" />
      </div>
    </div>

    <!-- 導航列 -->
    <header class="navbar">
      <div class="logo">
        <!-- 圓形 LOGO -->
        <router-link to="/">
          <div class="logo-circle">
            <img src="@/assets/AW LOGO.png" alt="Hotel Logo" />
          </div>
        </router-link>
        <!-- 酒店名稱 -->
        <div class="hotel-name">
          <span class="hotel-name">翎藍秘境酒店</span>
          <span class="hotel-name-en">Azure Wing Hotel</span>
        </div>
      </div>

      <!-- 漢堡選單按鈕 -->
      <div class="hamburger" @click="toggleMenu">☰</div>

      <!-- 導覽選單 -->
      <ul :class="{ active: isMenuOpen }">
        <li><router-link to="/about">飯店介紹</router-link></li>
        <li><router-link to="/room">客房資訊</router-link></li>
        <li><router-link to="/news">最新消息</router-link></li>
        <li><router-link to="/food">餐飲美饌</router-link></li>
        <li><router-link to="/contactus">聯絡我們</router-link></li>
        <li><router-link to="/reservation">立即預定</router-link></li>
        <li>
          <router-link to="/login">
            <img src="@/assets/user.png" alt="Login" class="login-icon" />
          </router-link>
        </li>
      </ul>
    </header>

    <!-- 頁面內容區域 -->
    <main>
      <router-view></router-view>
    </main>


  </div>

  
</template>

<script>
import menuController from "@/assets/menuController.js"; // 引入外部邏輯

export default {
  name: "App",
  mixins: [menuController], // 使用 mixin 載入邏輯
  data() {
    return {
      isMenuOpen: false, // 控制漢堡選單開關
      isLoading: true, // 控制載入畫面
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // 切換選單顯示狀態
    },
  },
};
</script>

<style scoped>
/* 導入外部樣式檔案 */
@import "@/assets/styles.css";
@import "@/assets/carousel.css"; /* 載入輪播圖樣式 */

/* 載入畫面樣式 */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeOut 3s forwards;
}

.loading-screen .logo-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loading-screen .logo-circle img {
  width: auto;
  height: 218%;
  margin-top: 31%;
  margin-right: 4px;
  object-fit: cover;
}

/* 淡出動畫 */
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
