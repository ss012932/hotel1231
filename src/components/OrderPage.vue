<template>
  <div class="order-page">
    <!-- 頁面標題 -->
    <header class="header">
      
      <!-- 返回箭頭：只在第一步顯示 -->
    <div class="tooltip-container" v-if="currentStep === 1">
      <img
        src="@/assets/picture/back.png"
        alt="Back to Home"
        class="back-arrow"
        @click="goToHome"
      />
      <span class="tooltip-text">回到首頁</span>
    </div>

      <h1 v-if="currentStep === 1">第一步 - 確認商品</h1>
      <h1 v-if="currentStep === 2">第二步 - 選擇付款方式</h1>
      <h1 v-if="currentStep === 3">完成訂房</h1>
    </header>

    <!-- 進度條 -->
    <div class="progress-bar">
      <div :class="['step', currentStep >= 1 ? 'active' : '']">
        <div class="circle">1</div>
        <span class="label">訂購明細</span>
      </div>
      <div class="separator">&gt;</div>
      <div :class="['step', currentStep >= 2 ? 'active' : '']">
        <div class="circle">2</div>
        <span class="label">付款方式</span>
      </div>
      <div class="separator">&gt;</div>
      <div :class="['step', currentStep >= 3 ? 'active' : '']">
        <div class="circle">3</div>
        <span class="label">完成訂房</span>
      </div>
    </div>

    <!-- 主內容區 -->
    <section class="content-section">
  <!-- 第一頁：訂購明細 -->
  <div v-if="currentStep === 1" class="order-details">
    <h2>訂購明細</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>房間資訊</th>
          <th>單價</th>
          <th>數量</th>
          <th>總價</th>
          <th>訂金</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            精緻客房<br />
            入住日期：2024/12/27<br />
            退房日期：2024/12/29<br />
            2 晚，不含早餐
          </td>
          <td>NT$ 3,800</td>
          <td>1</td>
          <td>NT$ 3,800</td>
          <td>NT$ 0</td>
        </tr>
      </tbody>
    </table>

    <!-- 訂單摘要 -->
    <div class="order-summary">
      <h2>訂單摘要</h2>
      <div class="summary-item">
        <span>訂單金額：</span>
        <span>NT$ 3,700</span>
      </div>
      <div class="summary-item">
        <span>稅金已內含：</span>
        <span>NT$ 0</span>
      </div>
      <div class="summary-item">
        <span>服務費：</span>
        <span>NT$ 0</span>
      </div>
      <div class="summary-total">
        <span>總金額：</span>
        <span>NT$ 3,700</span>
      </div>
      <div class="summary-item">
        <span>應付訂金：</span>
        <span>NT$ 0</span>
      </div>
    </div>
  </div>

     
  <div v-if="currentStep === 2" class="payment-methods">
  <!-- 訂購明細 -->
  <h2 class="section-title">訂購明細</h2>
  <table class="order-table">
    <thead>
      <tr>
        <th>房間資訊</th>
        <th>單價</th>
        <th>數量</th>
        <th>總價</th>
        <th>訂金</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          精緻客房<br />
          入住日期：2024/12/27<br />
          退房日期：2024/12/29<br />
          2 晚，不含早餐
        </td>
        <td>NT$ 3,800</td>
        <td>1</td>
        <td>NT$ 3,800</td>
        <td>NT$ 0</td>
      </tr>
    </tbody>
  </table>

  <!-- 訂購人聯絡資訊 -->
  <h2 class="section-title">訂購人聯絡資訊</h2>
  <p class="info-note">請您填寫以下資料，「*」為必填欄位。</p>
  <form class="form-container">
    <div class="form-group">
      <label for="lastName">* 姓氏</label>
      <input type="text" id="lastName" v-model="buyerInfo.lastName" placeholder="請輸入姓氏" />
    </div>
    <div class="form-group">
      <label for="firstName">* 名字</label>
      <input type="text" id="firstName" v-model="buyerInfo.firstName" placeholder="請輸入名字" />
    </div>
    <div class="form-group">
      <label for="email">* 電子信箱</label>
      <input type="email" id="email" v-model="buyerInfo.email" placeholder="請輸入電子信箱" />
    </div>
    <div class="form-group">
      <label>* 性別</label>
      <div class="radio-group">
        <label><input type="radio" value="male" v-model="buyerInfo.gender" /> 先生</label>
        <label><input type="radio" value="female" v-model="buyerInfo.gender" /> 女士</label>
      </div>
    </div>
    <div class="form-group">
      <label>* 生日</label>
      <div class="birth-date">
        <input type="text" v-model="buyerInfo.birthYear" placeholder="年" />
        <input type="text" v-model="buyerInfo.birthMonth" placeholder="月" />
        <input type="text" v-model="buyerInfo.birthDay" placeholder="日" />
      </div>
    </div>
    <div class="form-group">
      <label for="phone">手機號碼</label>
      <input type="text" id="phone" v-model="buyerInfo.phone" placeholder="請輸入手機號碼" />
    </div>
  </form>

  <!-- 付款方式 -->
  <h2 class="section-title">付款方式</h2>
  <div class="payment-option">
    <label><input type="radio" value="cash" v-model="paymentMethod" /> 現金</label>
  </div>

  <!-- 訂房備註 -->
  <h2 class="section-title">訂房備註</h2>
  <textarea v-model="remarks" placeholder="請輸入您的備註...(150字內)"></textarea>

  <!-- 條款確認 -->
  <div class="terms">
    <label>
      <input type="checkbox" v-model="termsAccepted" />
      我已閱讀並同意預訂條款。
    </label>
  </div>
</div>

<div v-if="currentStep === 3" class="completion-screen">
  <div class="checkmark-container">
    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <!-- 圓形 -->
      <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
      <!-- 打勾符號 -->
      <path class="checkmark-check" fill="none" d="M14 27l10 10 14-20" />
    </svg>
  </div>
  <h2 class="completion-title">訂房完成！</h2>
  <p class="completion-message">感謝您的預訂，我們期待您的光臨！</p>
  <button class="back-home-btn" @click="goToHome">返回首頁</button>
</div>


    </section>

     <!-- 操作按鈕 -->
     <footer class="actions">
      <!-- 上一步按鈕 -->
      <button
        v-if="currentStep > 1 && currentStep < 3"
        class="back-btn"
        @click="goBack"
      >
        上一步
      </button>

      <!-- 下一步按鈕 -->
      <button
        v-if="currentStep < 3"
        class="next-btn"
        @click="goNext"
      >
        下一步
      </button>
    </footer>
  </div>
</template>




<script>
import orderLogic from "@/assets/js/order.js"; // 引用外部邏輯

export default {
  name: "OrderPage",
  mixins: [orderLogic], // 混入邏輯
};
</script>


<style src="@/assets/css/order.css"></style> <!-- 匯入獨立的 CSS 檔案 -->