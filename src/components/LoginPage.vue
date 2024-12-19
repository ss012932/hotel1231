<template>
  <div class="login-page">
    <!-- 左側區域 -->
    <div class="login-left">
      <h1 class="welcome-title">歡迎蒞臨翎藍秘境酒店</h1>
      <p class="welcome-subtitle">Welcome To AZURE WING HOTEL</p>
    </div>

    <!-- 右側登入表單 -->
    <div class="login-form-container">
      <form class="login-form">
        <h2>會員登入</h2>

        <!-- Email 輸入框 -->
        <div class="form-group">
          <label for="email">請輸入 Email</label>
          <input type="email" id="email" placeholder="請輸入 Email" />
        </div>

        <!-- 密碼輸入框 -->
        <div class="form-group">
          <label for="password">請輸入密碼</label>
          <input type="password" id="password" placeholder="請輸入密碼" />
        </div>

          <!-- 驗證碼輸入框 -->
        <div class="form-group">
          <label for="captcha">請輸入驗證碼</label>
          <div class="captcha-container">
            <!-- 顯示驗證碼 -->
            <button type="button" class="captcha-btn">
              {{ num1 }} + {{ num2 }} =
            </button>
            <!-- 更換驗證碼按鈕 -->
            <button type="button" class="change-btn" @click="generateCaptcha">
              <img src="@/assets/change.png" alt="更換驗證碼" />
            </button>
            <input
              type="text"
              id="captcha"
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
        <button type="button" class="register-btn">會員註冊</button>

        <!-- 分隔線 -->
        <div class="divider">
          <span>或</span>
        </div>

        <!-- 第三方登入按鈕 -->
        <button type="button" class="social-btn facebook-btn">Facebook 帳號登入</button>
        <button type="button" class="social-btn google-btn">Google 帳號登入</button>
        <button type="button" class="social-btn line-btn">Line 帳號登入</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
};
</script>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      num1: 0, // 第一個隨機數
      num2: 0, // 第二個隨機數
      userInput: "", // 使用者輸入的驗證碼
    };
  },
  methods: {
    // 產生隨機驗證碼
    generateCaptcha() {
      this.num1 = Math.floor(Math.random() * 10); // 生成 0-9 的隨機數
      this.num2 = Math.floor(Math.random() * 10); // 生成 0-9 的隨機數
      this.userInput = ""; // 清空輸入框
    },
    // 驗證使用者輸入的答案
    validateCaptcha() {
      const correctAnswer = this.num1 + this.num2; // 計算正確答案
      if (parseInt(this.userInput) === correctAnswer) {
        alert("驗證碼正確，登入成功！");
      } else {
        alert("驗證碼錯誤，請重新輸入！");
        this.generateCaptcha(); // 錯誤時重新生成驗證碼
      }
    },
  },
  mounted() {
    this.generateCaptcha(); // 載入頁面時生成驗證碼
  },
};
</script>


<style scoped>
/* 驗證碼樣式 */
.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-btn {
  margin-right: 10px;
  padding: 10px;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  color: #6F4E37;
  font-size: 16px;
  cursor: pointer;
  user-select: none; /* 防止文字被選取 */
}

.captcha-btn:hover {
  background-color: #bbb;
}

input#captcha {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 更換驗證碼按鈕 */
.change-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-right: 20px;
}

.change-btn img {
  width: 24px; /* 設定圖片大小 */
  height: 24px;
  transition: transform 0.3s ease; /* 平滑縮放效果 */
}

.change-btn img:hover {
  transform: rotate(90deg); /* 懸停時旋轉 */
}
</style>

<style src="@/assets/login.css" scoped></style>
