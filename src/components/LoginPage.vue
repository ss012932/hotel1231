<template>
  <div class="login-page">
    <!-- 左側區域 -->
    <div class="login-left">
      <h1 class="welcome-title">歡迎蒞臨翎藍秘境酒店</h1>
      <p class="welcome-subtitle">Welcome To Azure Wing Hotel</p>
    </div>

    <!-- 右側登入表單 -->
    <div class="login-form-container">
      <form class="login-form" @submit.prevent="handleLogin">
        <h2>會員登入</h2>

        <!-- Email 輸入框 -->
        <div class="form-group">
          <label for="email">請輸入 Email</label>
          <input
            type="email"
            v-model="formData.email"
            placeholder="請輸入 Email"
          />
        </div>

        <!-- 密碼輸入框 -->
        <div class="form-group">
          <label for="password">請輸入密碼</label>
          <input
            type="password"
            v-model="formData.password"
            placeholder="請輸入密碼"
          />
        </div>

        
        <!-- 驗證碼輸入框 -->
        <div class="form-group">
          <label for="captcha">請輸入驗證碼</label>
          <div class="captcha-container">
            <!-- 顯示驗證碼 -->
            <button type="button" class="captcha-btn" disabled>
              {{ num1 }} + {{ num2 }} =
            </button>
            <!-- 更換驗證碼按鈕 -->
            <button type="button" class="change-btn" @click="generateCaptcha">
              <img src="@/assets/picture/change.png" alt="更換驗證碼" />
            </button>
            <input
              type="text"
              v-model="userInput"
              placeholder="請輸入驗證碼"
            />
          </div>
        </div>

        <!-- 忘記密碼 -->
        <div class="forgot-password">
          <a href="#">忘記密碼</a>
        </div>

        <!-- 登入按鈕 -->
        <button type="submit" class="login-btn">會員登入</button>

       <!-- 會員註冊按鈕 -->
<button type="button" class="register-btn" @click="goToRegister">會員註冊</button>

        <!-- 分隔線 -->
        <div class="divider">
          <span>或</span>
        </div>

         <!-- 第三方登入按鈕 -->
       
        <div id="googleSignInButton" class="social-btn google-btn"></div>
        <button type="button" class="social-btn line-btn" @click="handleLineLogin">
          Line 帳號登入
        </button>
      </form>
    </div>
  </div>
</template>

<script>
/* global google */ // 告訴 ESLint `google` 是全局變數
import loginLogic from "@/assets/js/loginLogic.js"; // 引用外部邏輯

export default {
  name: "LoginPage",
  mixins: [loginLogic], // 混入邏輯
  mounted() {
    // 初始化 Google 登入
    this.initGoogleSignIn();
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    initGoogleSignIn() {
      // 初始化 Google 按鈕
      google.accounts.id.initialize({
        client_id: "421425399671-acg35t5vaea41kv29dua63cok5o5nveu.apps.googleusercontent.com",
        callback: this.handleGoogleLogin,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" } // 自訂樣式
      );
    },
  },
};
</script>



<style src="@/assets/css/login.css" scoped></style>
