<template>
  <div class="container">
    <Banner
      :width="889 + 'px'"
      :height="329 + 'px'"
      :banner="$store.state.home.banner"
    ></Banner>
    <Recommend :newMusic="$store.state.home.newMusic"></Recommend>
      <!-- <Play></Play> -->
    
  </div>
</template>

<script>
import Recommend from "@/pages/Home/Recommend/Recommend.vue";
import Banner from "@/components/Banner.vue";
export default {
  components: {
    Recommend,
    Banner,
  },
  mounted() {
    this.$store.dispatch("getBanner");
  },


};
</script>

<style scoped></style>
