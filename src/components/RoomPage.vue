<template>
  <div class="room-info-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-image"></div>
    </div>

    <!-- Room Description Section -->
    <template>
  <div class="room-description">
    <div class="room-card" v-for="(room, index) in rooms" :key="index">
      <!-- 圖片區域 -->
      <div class="room-image"></div>
      <!-- 文字區域 -->
      <div class="room-text">
        <h3>{{ room.title }}</h3>
        <p>{{ room.description }}</p>
        <button class="learn-more-btn">了解更多</button>
      </div>
    </div>
  </div>
</template>


    <!-- Room Price Table -->
    <div class="room-pricing">
      <h2 class="room-title">房價表格</h2>
      <table>
        <thead>
          <tr>
            <th>房型</th>
            <th>坪數</th>
            <th>床數</th>
            <th>定價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pricing, index) in pricingData" :key="index">
            <td>{{ pricing.type }}</td>
            <td>{{ pricing.size }}</td>
            <td>{{ pricing.beds }}</td>
            <td>{{ pricing.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Booking Notice -->
    <div class="booking-notice">
    <h2 class="notice-title">訂房須知</h2>
    <ul>
      <li v-for="(notice, index) in bookingNotices" :key="index">
        {{ notice }}
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import roomLogic from "@/assets/js/room.js"; // 引用外部邏輯

export default {
  name: "RoomPage",
  mixins: [roomLogic], // 混入邏輯
};
</script>

<style src="@/assets/css/room.css" scoped></style>
