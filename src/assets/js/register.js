import api from "@/assets/js/api"; // 假設 API 模組存在
import axios from "axios"; // 確保 axios 被導入

export default {
  name: "RegisterPage",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
        fullname: "",
        country: "",
        phone: "",
        dob: "",
      },
      today: "", // 儲存今天的日期
      countries: [], // 儲存國家列表
      passwordValidationMessage: "", // 密碼驗證訊息
      passwordsMatch: true, // 密碼是否一致
    };
  },
  methods: {
    setToday() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // 月份補 0
      const dd = String(today.getDate()).padStart(2, "0"); // 日期補 0
      this.today = `${yyyy}-${mm}-${dd}`;
    },

    async fetchCountryList() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        // 將數據格式化為所需的格式
        this.countries = response.data
          .map((country) => ({
            name: country.name.common, // 國家名稱
            code: country.cca2, // 國家代碼
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // 按名稱排序 A~Z
      } catch (error) {
        console.error("無法加載國家列表", error);
        alert("載入國籍列表失敗，請稍後再試！");
      }
    },

    validatePasswords() {
      if (!this.formData.confirmPassword) {
        this.passwordValidationMessage = "";
        this.passwordsMatch = true;
        return;
      }
      if (this.formData.password === this.formData.confirmPassword) {
        this.passwordValidationMessage = "密碼一致！";
        this.passwordsMatch = true;
      } else {
        this.passwordValidationMessage = "密碼不一致，請檢查！";
        this.passwordsMatch = false;
      }
    },

    async handleRegister() {
      // 驗證密碼一致性
      if (this.formData.password !== this.formData.confirmPassword) {
        alert("密碼與確認密碼不一致！");
        return;
      }

      // 組裝 payload
      const payload = {
        Email: this.formData.email.trim(),
        PasswordHash: this.formData.password.trim(), // 密碼
        FullName: this.formData.fullname.trim(),
        Countries: this.formData.country.trim(),
        Phone: this.formData.phone.trim(),
        Birth: new Date(this.formData.dob).toISOString(),
      };
      
      console.log("發送的 payload：", payload);

      try {
        const response = await api.post("/Login/register", payload);
        if (response.data.success) {
          alert("註冊成功！");
          this.$router.push("/login"); // 跳轉到登入頁面
        } else {
          alert(response.data.message || "註冊失敗！");
        }
      } catch (error) {
        if (error.response) {
          console.error("伺服器返回錯誤", error.response.data);
          if (error.response.status === 409) {
              alert(error.response.data.message || "此信箱已被註冊！");
          } else {
              alert(error.response.data.message || "伺服器錯誤，請稍後再試！");
          }
      } else if (error.request) {
          console.error("未收到伺服器回應", error.request);
          alert("無法連接伺服器，請檢查網路或稍後再試！");
      } else {
          console.error("請求設置錯誤", error.message);
          alert("發生未知錯誤，請稍後再試！");
      }
      }
    },
  },

  created() {
    this.setToday(); // 初始化時設定今天的日期
    this.fetchCountryList(); // 初始化時加載國家列表
  },
};
