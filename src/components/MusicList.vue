<template>
  <div class="main">
    <ul>
      <li v-for="item in music" :key="item.id">
        <div class="img">
          <a href="javascript:">
            <img
              v-lazy="item.album ? item.album.blurPicUrl : item.al.picUrl"
              @click="play(item)"
            />
          </a>
        </div>
        <div class="title" @click="play(item)">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MusicList",
  props: ["music"],
  data() {
    return {};
  },
  methods: {
    play(music) {
        this.$store.dispatch("playMusic", {ids:music.id,type:1});
    },
  },
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  margin-top: 10px;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 18%;
      height: 200px;
      margin: 20px 0;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 170px;
        cursor: pointer;

      }
      .img {
        padding: 5%;
        background-color: antiquewhite;
        
      }
      .title {
        text-align: center;
        font-size: 13px;
        margin-top: 2px;
        cursor: pointer;
      }
    }
    img:hover {
      transform: scale(1.15);
      border-radius: 4px;
      box-shadow: 10px 10px 6px rgba(0, 0, 0, 0.5);
      transition: 0.5s;
    }
  }
}
</style>
