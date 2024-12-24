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
        subscribe: false,
      },
      countries: [], // 儲存國家列表
    };
  },
  methods: {
    async fetchCountryList() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        // 將數據格式化為所需的格式
        this.countries = response.data.map((country) => ({
          name: country.name.common, // 國家名稱
          code: country.cca2,       // 國家代碼
        }));
      } catch (error) {
        console.error("無法加載國家列表", error);
        alert("載入國籍列表失敗，請稍後再試！");
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
   this.fetchCountryList(); // 初始化時加載國家列表
  },
};
