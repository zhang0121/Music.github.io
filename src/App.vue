<template>
  <div class="container">
    <Head></Head>

    <div v-if="$route.meta.isShow!='no'" class="play">
      <Play></Play>
    </div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped lang="less">
.container {
  width: 100%;

  .play {
    z-index: 100;
    width:80%;
    position: fixed;
    top: 75.5%;
    left: 48%;
    transform: translateX(-52%);
  }
}
</style>
