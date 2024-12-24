import api from "@/assets/js/api"; // 引用 API 模組

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
          this.$router.push("/dashboard");
        } else {
          alert(response.data.message || "登入失敗！");
        }
      } catch (error) {
        console.error("登入錯誤", error.response?.data || error.message);
        alert(error.response?.data?.message || "伺服器錯誤，請稍後再試！");
      }
    },
    created() {
      this.generateCaptcha(); // 初始化時生成驗證碼
    },
  },
};
