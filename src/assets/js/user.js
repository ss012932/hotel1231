import Cookies from "js-cookie"; // 引用 js-cookie 用於操作 Cookies
import api from "@/assets/js/api"; // 引用 API 模組

export default {
  name: "MemberCenter",
  data() {
    return {
      currentSection: "memberInfo", // 預設顯示的區塊
      email: "", // 從後端獲取的電子信箱
      oldPassword: "", // 用戶輸入的舊密碼
      newPassword: "", // 用戶輸入的新密碼
      name: "", // 從後端獲取的姓名
      phone: "", // 從後端獲取的電話
      birthday: "", // 從後端獲取的生日
      currentOrderFilter: "paid", // 訂單過濾器
      orders: [], // 從後端獲取的訂單資料
    };
  },
  computed: {
    // 根據當前篩選條件過濾訂單
    filteredOrders() {
      return this.orders.filter(order => order.status === this.currentOrderFilter);
    },
  },
  methods: {
    // 切換顯示的區塊
    showSection(section) {
      this.currentSection = section;
    },
    // 設定訂單篩選條件
    filterOrders(filter) {
      this.currentOrderFilter = filter;
    },
    // 儲存用戶資料
    async saveInfo() {
      try {
        const payload = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          name: this.name,
          phone: this.phone,
          birthday: this.birthday,
        };
        const response = await api.post("/user/update-profile", payload);
        if (response.data.success) {
          alert("會員資料已成功儲存！");
        } else {
          alert("更新會員資料失敗：" + (response.data.message || "未知錯誤"));
        }
      } catch (error) {
        console.error("更新會員資料失敗:", error.response?.data || error.message);
        alert("伺服器錯誤，請稍後再試！");
      }
    },
    // 從後端抓取會員資料
    async fetchUserInfo() {
      try {
        const emailFromCookie = Cookies.get("email"); // 從 Cookies 讀取 Email
        if (!emailFromCookie) {
          alert("無法獲取用戶的 Email，請重新登入！");
          return;
        }
        this.email = emailFromCookie; // 設定 Email 到 data 中

        const response = await api.get("/user/profile", { email: this.email });
        if (response.data.success) {
          const { name, phone, birthday, orders } = response.data.user;
          this.name = name;
          this.phone = phone;
          this.birthday = birthday;
          this.orders = orders || []; // 設定訂單資料
        } else {
          alert("無法獲取會員資料：" + (response.data.message || "未知錯誤"));
        }
      } catch (error) {
        console.error("獲取會員資料失敗:", error.response?.data || error.message);
        alert("伺服器錯誤，無法獲取會員資料！");
      }
    },
  },
  created() {
    this.fetchUserInfo(); // 頁面載入時執行獲取會員資料的操作
  },
};
