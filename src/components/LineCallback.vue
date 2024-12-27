<template>
    <div>
      正在處理LINE登入，請稍候...
    </div>
  </template>
  
  <script>
  import api from "@/assets/js/api"; // 引用 API 模組
  import Cookies from "js-cookie";
  import Auth from "@/assets/js/auth";
  
  export default {
    mounted() {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    if (code) {
      // 傳送授權碼給後端進行驗證
      this.exchangeLineCodeForToken(code);
    } else {
      alert("LINE 授權失敗！");
    }
  },
  methods: {
    async exchangeLineCodeForToken(code) {
      try {
        const response = await api.post("/Login/line-login", { code });
        if (response.data.success) {
          alert("LINE 登入成功！");
          // 處理登入後的跳轉
          this.$router.push("/dashboard");
        } else {
          alert(response.data.message || "LINE 登入失敗！");
        }
      } catch (error) {
        console.error("LINE 登入錯誤:", error);
        alert("伺服器錯誤，請稍後再試！");
      }
    },
  },
};
  </script>
  