export default {
    data() {
      return {
        currentNewsIndex: 0,
        newsList: [
          { date: "2023.01.01 - 2025.12.31", title: "【公告】泳池維修，全日關閉" },
          { date: "2023.02.01 - 2025.12.31", title: "【公告】餐廳改裝，暫停營業" },
          // 添加更多新聞...
        ],
      };
    },
    computed: {
      visibleNews() {
        return this.newsList.slice(this.currentNewsIndex, this.currentNewsIndex + 2);
      },
    },
    methods: {
      previousNews() {
        if (this.currentNewsIndex > 0) {
          this.currentNewsIndex -= 1;
        }
      },
      nextNews() {
        if (this.currentNewsIndex < this.newsList.length - 2) {
          this.currentNewsIndex += 1;
        }
      },
    },
  };
  