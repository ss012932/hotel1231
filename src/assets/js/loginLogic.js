import api from "@/assets/js/api"; // 引用 API 模組
import Cookies from "js-cookie";
import Auth from "@/assets/js/auth"; // 引用 Auth 模組

export default {
  data() {
    return {
      num1: Math.floor(Math.random() * 10), // 初始化為隨機數 0-9
      num2: Math.floor(Math.random() * 10), // 初始化為隨機數 0-9
      userInput: "", // 使用者輸入的驗證碼
      formData: {
        email: "",
        password: "",
      },
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
        return true; // 驗證成功
      } else {
        alert("驗證碼錯誤，請重新輸入！");
        this.generateCaptcha(); // 錯誤時重新生成驗證碼
        return false;
      }
    },

    // 驗證 Google Credential
    validateGoogleCredential(response) {
      const credential = response?.credential;
      if (!credential) {
        alert("Google 登入憑證缺失！");
        return null;
      }
      return credential;
    },

    // 解碼 Google JWT
    decodeGoogleJWT(credential) {
      try {
        const profile = JSON.parse(
          decodeURIComponent(
            escape(
              window.atob(
                credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
              )
            )
          )
        );
        return {
          email: profile.email,
          fullName: profile.name,
        };
      } catch (error) {
        console.error("JWT 解碼錯誤:", error);
        alert("Google 用戶資訊解碼失敗！");
        return null;
      }
    },

    // 傳送 Google 用戶資訊到後端
    async sendGoogleUserToBackend(email, fullName) {
      try {
        const apiResponse = await api.post("/Login/google-register", {
          email,
          fullName,
        });
        return apiResponse;
      } catch (error) {
        console.error("Google 註冊錯誤:", error);
        const message =
          error.response?.data?.message || "伺服器錯誤，請稍後再試！";
        throw new Error(message);
      }
    },

    // 提交登入資料
    async handleLogin() {
      if (!this.validateCaptcha()) {
        return;
      }

      try {
        // 檢查 formData 是否包含 email 和 password
        if (!this.formData.email || !this.formData.password) {
          alert("請確保 Email 和密碼已輸入！");
          return;
        }

        const response = await api.post("/Login/login", {
          email: this.formData.email,
          password: this.formData.password,
        });

        if (response.data.success) {
          alert("登入成功！");
          const { role, token } = response.data; // 解構後端返回的角色和 Token
          localStorage.setItem("authToken", token); // 存儲到 localStorage

          // 儲存資料到 Cookies，例如儲存 token 和 email
          Cookies.set("token", response.data.token, {
            expires: 7,
            secure: true,
          }); // 設定 cookies 過期時間為 7 天
          Cookies.set("role", role, { expires: 7, secure: true });
          Cookies.set("email", this.formData.email, {
            expires: 7,
            secure: true,
          });

          // 基於角色跳轉
          Auth.redirectToRolePage(this.$router);
        } else {
          alert(response.data.message || "登入失敗！");
        }
      } catch (error) {
        console.error("登入錯誤", error.response?.data || error.message);
        alert(error.response?.data?.message || "伺服器錯誤，請稍後再試！");
      }
    },

    /// 處理 Google 登入
    async handleGoogleLogin(response) {
      try {
        const credential = this.validateGoogleCredential(response);
        if (!credential) return;

        const userInfo = this.decodeGoogleJWT(credential);
        if (!userInfo || !userInfo.email || !userInfo.fullName) {
          alert("無法獲取完整的 Google 用戶資訊！");
          return;
        }

        const apiResponse = await this.sendGoogleUserToBackend(
          userInfo.email,
          userInfo.fullName
        );

        if (apiResponse.data.success) {
          const role = apiResponse.data.role || "Unknown";
          const token = apiResponse.data.token; // 後端應該返回 token

          // 儲存資料到 Cookies
          Cookies.set("token", token, { expires: 7, secure: true }); // 設定 cookies 過期時間為 7 天
          Cookies.set("role", role, { expires: 7, secure: true });
          Cookies.set("email", userInfo.email, { expires: 7, secure: true });

          // 基於角色跳轉
          Auth.redirectToRolePage(this.$router);
        } else {
          alert(apiResponse.data.message || "Google 登錄失敗！");
        }
      } catch (error) {
        alert(error.message); // 顯示錯誤訊息
      }
    },

    async handleLineLogin() {
      const clientId = "2006706094"; // 替換為你的 LINE Channel ID
      const redirectUri = "http://localhost:8080/LineCallback"; // 替換為你的 Redirect URI
      const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&state=random_state&scope=profile%20openid%20email`;

      // 跳轉到 LINE 授權頁面
      window.location.href = lineAuthUrl;
    },

    created() {
      this.generateCaptcha(); // 初始化時生成驗證碼
    },
  },
};
