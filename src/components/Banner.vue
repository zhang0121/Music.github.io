<template>
<div class="container">
  <div
    class="swiper-container"
    :style="{ width: $attrs.width, height: $attrs.height }"
  >
    <div class="swiper-wrapper" >
      <div class="swiper-slide" v-for="item in banner" :key="item.targetId">
        <img
          :src="item.imageUrl"
          :style="{ width: $attrs.width, height: $attrs.height }"
          :id="item.targetId"
          @click="toListDetail(item)"
        />{{ item.imageUrl }}
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "swiper/js/swiper.min.js";

export default {
  props: ["banner"],
  data() {
    return {};
  },
  methods:{
  // 路由跳转至歌单详情
  toListDetail(item){
    // console.log(e.target.id);
    if(item.targetType==1){
      this.$store.dispatch("playMusic", { ids: item.targetId, type: 1 });
    // this.$router.push({name:'listdetail',query:{listId:e.target.id}});
    }
  }
  },
  watch: {
    banner: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // console.log(this.banner)
          new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 自动轮播
            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
  mounted() {
    // console.log(this.$attrs)
  },
};
</script>

<style scoped>
.container {
  background-color:  rgb(110, 110, 114);
  width: 100%;
}
</style>
