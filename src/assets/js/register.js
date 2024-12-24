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
      // 簡單表單驗證
      if (this.formData.password !== this.formData.confirmPassword) {
        alert("密碼與確認密碼不一致！");
        return;
      }

      try {
        // 發送 API 請求
        const response = await api.post("/register", this.formData);

        if (response.data.success) {
          alert("註冊成功！");
          this.$router.push("/login"); // 跳轉到登入頁面
        } else {
          alert(response.data.message || "註冊失敗！");
        }
      } catch (error) {
        console.error("註冊失敗", error.response?.data || error.message);
        alert(error.response?.data?.message || "伺服器錯誤，請稍後再試！");
      }
    },
  },


  created() {
    this.setToday(); // 初始化時設定今天的日期
    this.fetchCountryList(); // 初始化時加載國家列表
  },
};
