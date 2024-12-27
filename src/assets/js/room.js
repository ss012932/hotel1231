export default {
    data() {
      return {
        rooms: [
          {
            title: "精緻客房",
            description: "享受經典的客房空間，提供賓客舒適便利的住宿體驗。",
          },
          {
            title: "豪華客房",
            description: "享受經典的客房空間，提供賓客舒適便利的住宿體驗。",
          },
          {
            title: "豪華客房",
            description: "享受經典的客房空間，提供賓客舒適便利的住宿體驗。",
          },
        ],
        pricingData: [
          { type: "精緻客房", size: "10", beds: "一大床/兩小床", price: "NT$ 3,800" },
          { type: "家庭式客房", size: "15", beds: "一大床/兩小床", price: "NT$ 10,800" },
          { type: "豪華湯屋客房", size: "15", beds: "一大床/兩小床", price: "NT$ 12,800" },
        ],
        bookingNotices: [
          "飯店入住時間為下午三點後，退房時間為中午十二點前。",
          "提前入住或延後退房需另收取相關費用，並以飯店回覆為主。",
          "本飯店未設有停車場，請參考飯店附近停車場資訊。",
          "本飯店禁止攜帶寵物入住，導盲犬不在此範圍內。",
          "為確保所有旅客之住宿品質，於晚間10點過後請勿大聲喧嘩、吵鬧，敬請配合。",
          "飯店客房窗戶及陽台基於安全考量，絕無法開啟或使用。",
          "本飯店依據毒品危害防制條例，若有相關行為，飯店有權收取清潔費用。",
          "本飯店視入住房型提供加床服務，如有需求，請直接與飯店人員接洽。",
          "可另提供摺疊床、嬰兒澡盆、嬰兒澡盆，數量有限，請提前預約。",
          "未滿18歲的旅客需有成年人陪同或提供合法家長簽名方可入住。",
          "為確保其他住客權益，如有干擾情況，飯店有權拒絕入住。",
        ],
      };
    },
  };