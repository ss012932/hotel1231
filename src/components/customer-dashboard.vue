<template>
  <div class="member-center">
    <div class="content-container">
      <!-- 左側按鈕區 -->
      <div class="sidebar">
        <button @click="showSection('memberInfo')" :class="{ active: currentSection === 'memberInfo' }">
          會員資料
        </button>
        <button @click="showSection('orderDetails')" :class="{ active: currentSection === 'orderDetails' }">
          訂單詳情
        </button>
      </div>

      <!-- 右側內容顯示區 -->
      <div class="main-content">
        <!-- 會員資料區 -->
        <div v-if="currentSection === 'memberInfo'">
          <h1>會員資料</h1>

          <div class="info-item">
            <label for="email">電子信箱：</label>
            <span>{{ email }}</span>
          </div>

          <div class="info-item">
            <label for="old-password">舊密碼：</label>
            <input type="password" id="old-password" v-model="oldPassword" placeholder="輸入舊密碼" />
          </div>

          <div class="info-item">
            <label for="new-password">新密碼：</label>
            <input type="password" id="new-password" v-model="newPassword" placeholder="輸入新密碼" />
          </div>

          <div class="info-item">
            <label for="name">姓名：</label>
            <span>{{ name }}</span>
          </div>

          <div class="info-item">
            <label for="phone">電話：</label>
            <input type="tel" id="phone" v-model="phone" placeholder="輸入新電話號碼" />
          </div>

          <div class="info-item">
            <label for="birthday">生日：</label>
            <input type="date" id="birthday" v-model="birthday" />
          </div>

          <button @click="saveInfo" class="save-btn">儲存變更</button>
        </div>

        <!-- 訂單詳情區 -->
        <div v-if="currentSection === 'orderDetails'">
          <h2 class="order-title">訂單詳情</h2>

          <div class="order-tabs">
            <button @click="filterOrders('paid')" :class="{ active: currentOrderFilter === 'paid' }">
              已付款
            </button>
            <button @click="filterOrders('unpaid')" :class="{ active: currentOrderFilter === 'unpaid' }">
              未付款
            </button>
            <button @click="filterOrders('canceled')" :class="{ active: currentOrderFilter === 'canceled' }">
              取消
            </button>
          </div>

          <div class="order-content">
            <div v-for="order in filteredOrders" :key="order.id" class="order-item">
              <p>訂單編號：{{ order.id }}</p>
              <p>狀態：{{ order.status }}</p>
              <p>金額：{{ order.amount }}</p>
              <p>日期：{{ order.date }}</p>
            </div>
            <p v-if="filteredOrders.length === 0">目前沒有對應的訂單。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import userLogic from "@/assets/js/user.js"; // 引用 JS 模組
  
  export default {
    name: "CustomerDashboard",
    mixins: [userLogic], // 混入用戶邏輯
  };
  </script>
  
  <style src="@/assets/css/user.css" scoped></style>
  