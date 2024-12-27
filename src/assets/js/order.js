export default {
  data() {
    return {
      currentStep: 1, // 預設為第一步
      paymentMethod: "", // 使用者選擇的付款方式
      buyerInfo: {
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        gender: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
      },
      remarks: "", // 備註
      termsAccepted: false, // 條款是否已確認
    };
  },
  methods: {

    goToHome() {
      this.$router.push("/"); // 使用 Vue Router 返回首頁
    },
  

    // 返回上一頁邏輯
    goBack() {
      if (this.currentStep > 1) {
        this.currentStep--; // 當前步驟 -1，回到上一頁
      } else {
        alert("目前已經是第一步驟，無法返回！"); // 提示用戶已經在第一步
      }
    },

    // 進入下一頁邏輯
    goNext() {
      if (this.currentStep === 1) {
        this.currentStep++; // 從第一步進入第二頁
      } else if (this.currentStep === 2) {
        if (!this.paymentMethod) {
          alert("請選擇付款方式！"); // 提示用戶選擇付款方式
          return;
        }
        if (!this.termsAccepted) {
          alert("請同意條款！"); // 提示用戶同意條款
          return;
        }
        this.currentStep++; // 從第二頁進入第三頁
      } else {
        alert("目前已經是最後一步驟！"); // 提示用戶已完成所有步驟
      }
    },
  },
};
