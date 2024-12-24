export default {
    data() {
      return {
        isLoading: true, // 預設顯示載入畫面
        isMenuOpen: false, // 控制漢堡選單開關
      };
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false; // 5 秒後隱藏載入畫面
      }, 5000);
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen; // 切換選單狀態
      },
    },
  };
  