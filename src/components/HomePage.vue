<template>
 <div>
    <!-- 主圖片區 (輪播圖) -->
    <section id="hero" class="carousel-container">
      <div class="carousel">
        <div
          class="carousel-slide"
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: currentSlide === index }"
        >
          <img :src="image" alt="輪播圖圖片" />
        </div>
      </div>
      <!-- 底部選擇按鈕 -->
      <div class="carousel-indicators">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="goToSlide(index)"
          :class="{ active: currentSlide === index }"
        ></button>
      </div>
    </section>
    
    <!-- 關於我們 -->
    <section id="about" class="content-section">
      <h2>關於我們</h2>
      <div class="content-box"></div>
      <div class="content-box"></div>
      <div class="content-box"></div>
    </section>

    <!-- 最新消息 -->
    <section id="news" class="news-section">
      <h2>最新公告</h2>
      <div class="news-box"></div>
      <div class="news-box"></div>
      <div class="news-box"></div>
    </section>

    <!-- 頁尾 -->
    <footer class="footer">
      <div class="address">
        <p style="color: azure;">Copyright © 2024 翎藍秘境酒店 All Rights Reserved.</p>
        
      </div>
     
    </footer>
  </div>
</template>

<script>
import { loadImages, goToSlide, startAutoSlide, stopAutoSlide, nextSlide } from "@/assets/js/homepageLogic.js";

export default {
  name: "HomePage",
  data() {
    return {
      currentSlide: 0, // 當前顯示的輪播圖索引
      images: [], // 儲存從 assets/images 讀取的圖片
      autoSlideInterval: null, // 自動切換輪播圖的計時器
    };
  },
  methods: {
    goToSlide,
    nextSlide,
    loadImages,
    startAutoSlide,
    stopAutoSlide,
  },
  mounted() {
    this.images = this.loadImages(); // 組件載入時讀取圖片
    this.startAutoSlide(); // 啟動自動輪播
  },
  beforeDestroy() {
    this.stopAutoSlide(); // 在組件銷毀前停止自動輪播
  },
};
</script>

<style src="@/assets/homepage.css" scoped></style>
