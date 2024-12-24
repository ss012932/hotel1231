<template>
  
  <div class="register-page">
    <h2 class="title">會員註冊</h2>
    <form class="form" @submit.prevent="handleRegister">
      <!-- 信箱 -->
      <div class="form-group">
        <label for="email" class="required-label">信箱</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          placeholder="請輸入信箱"
          required
        />
      </div>

      <!-- 密碼 -->
      <div class="form-group">
        <label for="password" class="required-label">密碼</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          placeholder="請輸入密碼"
          required
        />
        <small class="form-text">密碼長度為 8~20 位字母或數字</small>
      </div>

      <!-- 確認密碼 -->
      <div class="form-group">
        <label for="confirm-password" class="required-label"
          >再次確認密碼</label
        >
        <input
          type="password"
          id="confirm-password"
          v-model="formData.confirmPassword"
          placeholder="請再次輸入密碼"
          required
        />
      </div>

      <!-- 姓名 -->
      <div class="form-group">
        <label for="fullname" class="required-label">姓名</label>
        <input
          type="text"
          id="fullname"
          v-model="formData.fullname"
          placeholder="請輸入姓名"
          required
        />
      </div>

      <!-- 國籍 -->
      <div class="form-group">
        <label for="country" class="required-label">國籍</label>

        <select
          id="country"
          class="form-select"
          v-model="formData.country"
          required
        >
          <option value="" disabled>請選擇國籍</option>
          <option
            v-for="country in countries"
            :key="country.code"
            :value="country.name"
          >
            {{ country.name }}
          </option>
        </select>
      </div>

      <!-- 手機 -->
      <div class="form-group">
        <label for="phone" class="required-label">手機</label>
        <input
          type="tel"
          id="phone"
          v-model="formData.phone"
          placeholder="請輸入手機號碼"
          required
        />
      </div>

      <!-- 生日輸入框 -->
<div class="form-group">
  <label for="dob" class="required-label">生日</label>
  <input
    type="date"
    class="form-control form-control-sm"
    id="dob"
    v-model="formData.dob"
    :max="today"
    required
  />
</div>

      <!-- 送出按鈕 -->
      <button type="submit" class="btn-submit">送出 ></button>
    </form>
  </div>
</template>

<script>
import registerLogic from "@/assets/js/register.js"; // 引入註冊邏輯

export default {
  name: "RegisterPage",
  mixins: [registerLogic], // 混入邏輯
};
</script>

<style src="@/assets/css/registerpage.css" scoped></style>
