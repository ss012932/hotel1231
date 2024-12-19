// 動態載入 src/assets/images 內的圖片
export function loadImages() {
    const context = require.context("@/assets/images", false, /\.(png|jpe?g|gif|svg)$/);
    return context.keys().map((key) => context(key));
  }
  
  // 切換到指定的頁面
  export function goToSlide(index) {
    this.currentSlide = index;
  }
  
  // 切換到下一張圖片
  export function nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }
  
  // 啟動自動輪播
  export function startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
  
  // 停止自動輪播
  export function stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
  