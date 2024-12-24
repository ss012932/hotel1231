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
    
    
    <section class="content">
      <!-- 左側內容 -->
      <div class="description">
        <h4>自然之心，身心之旅</h4><br/>
        <p>
        依偎於靜謐森林之間，翎藍秘境酒店帶您進入與自然共融的旅程。<br/>
        享受綠意環繞的溫泉療癒，讓每一刻都被大自然的和諧環抱。<br/>
        專為追求心靈與身體平衡的旅人打造，於此喚醒內心的寧靜與活力。
        </p>
      </div>

      <!-- 右側內容 -->
      <div class="highlight">
        <h4>綠意環境，私密空間</h4><br/>
        <p>
        漫步於蒼翠林間，微風輕撫樹梢，空氣中飄散著自然的清香。<br/>
        酒店客房皆以自然元素為設計靈感，大片落地窗引入森林美景，打造寧靜、私密的休憩空間。        </p>
      </div>
    </section>

    <!-- 圖片與文字區塊 -->
    <section class="image-text-section">
      
      <!-- 左側圖片 -->
      <div class="image-box">
        <img src="@/assets/picture/forest.png" alt="森林圖">
      </div>

      <!-- 右側文字內容 -->
      <div class="text-content">
        <h3>四季之美，隨心探索</h3><br/>
        <p>
          探索這片林間的氣息，擁抱過往的軌跡。 <br />
          春至山林，綠意盎然；秋冬更迭，溫泉共生。 <br />
          我們以友善環境為核心，讓每一位旅人在此地回歸純粹的生活樂趣。
        </p>
      </div>
    </section>

    <section class="news-section">
  <div class="news-left">
    <h4 class="news-englishtitle">NEWS</h4>
    <h3 class="news-title">最新消息</h3>
    <div class="news-controls">
      <button @click="previousNews" class="news-button">
        <img src="@/assets/picture/left.png" alt="左" />
      </button>
      <button @click="nextNews" class="news-button">
        <img src="@/assets/picture/right.png" alt="右" />
      </button>
    </div>
    <button class="more-button">了解更多</button>
  </div>
  <div class="news-right">
    <div
      class="news-item"
      v-for="(news, index) in visibleNews"
      :key="index"
    >
      <div class="news-image"></div>
      <div class="news-content">
        <p class="news-date">{{ news.date }}</p>
        <h4 class="news-content-title">{{ news.title }}</h4>
      </div>
    </div>
  </div>
</section>


    <!-- 交通資訊區塊 -->
    <section class="info-section">
      <div class="info-content">
        <h2  class="info-p">酒店位置</h2><br/>
        <h3>交通資訊</h3>
        <p class="info-p">
          本飯店位於山林間，遠離都市塵囂，為您提供舒適且寧靜的住宿體驗。<br/>
          飯店附設停車場，交通便利，讓您輕鬆抵達，享受大自然的寧靜氛圍。
        </p>

        <h3>停車資訊</h3>
        <p class="info-p">
          飯店附設專屬停車場，旅客可直接駕車前往。<br/>
          停車場位於地下一樓至地下二樓，提供充足車位，適合自駕旅客入住。
        </p>

        <h3>搭乘大眾交通工具</h3>
        <p class="info-p">
          搭乘捷運至鄰近車站，並由指定接駁車接送至飯店。
        </p>  
        <ul  class="info-list">
            <li>捷運抵達新店站一號出口後，請前往接駁車候車處。</li>
            <li>每日提供定時接駁服務，車程約 15 分鐘即可抵達飯店。</li>
        </ul>
        <p class="info-p"> 
          如需接駁車時刻表或預約服務，請提前聯繫飯店前台。
        </p>
      </div>
    </section>

    
  </div>
</template>

<script>
import { loadImages, goToSlide, startAutoSlide, stopAutoSlide, nextSlide } from "@/assets/js/homepageLogic.js";
import newsLogic from "@/assets/js/newsLogic";

export default {
  name: "HomePage",
  mixins: [newsLogic], // 引入外部邏輯模組
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

<style src="@/assets/css/homepage.css" scoped></style>
<style src="@/assets/css/news-section.css" scoped></style>
