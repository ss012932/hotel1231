import Auth from "@/assets/js/auth";

export default {
  data() {
    return {
      isLoading: true, // 預設顯示載入畫面
      isMenuOpen: false, // 控制漢堡選單開關
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false; // 4 秒後隱藏載入畫面
    }, 4000);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // 切換選單狀態
    },
    handleMemberClick() {
      // 檢查是否已登入，並根據角色跳轉
      const token = Auth.getRole(); // 確認是否有登入
      if (!token) {
        alert("未登入，請重新登入！");
        this.$router.push("/login"); // 跳轉到登入頁
      } else {
        Auth.redirectToRolePage(this.$router); // 根據角色跳轉
      }
    },
  },
};
