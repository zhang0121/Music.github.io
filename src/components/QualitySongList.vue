<template>
  <div class="main">
    <ul @click="getDetail($event)">
      <li v-for="item in songList?songList:searchSongList" :key="item.id" :id="item.id">
        <div class="img">
          <span> <img v-lazy="item.coverImgUrl" :id="item.id" /> </span>
        </div>
        <div class="title" :id="item.id">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MusicList",
  props: ["songList"],
  methods: {
    // 路由跳转 歌单详情
    getDetail(e) {
      if (e.target.id) {
        this.$router.push({
          name: "listdetail",
          query: { listId: e.target.id },
        });
      }
      // console.log(e.target.id);
    },
  },
  computed:{
    // 搜索的歌单
    searchSongList(){
      if(this.$store.state.search.songLists){
       return  this.$store.state.search.songLists
      }
    }
  }
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  // margin-top: 5px;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // justify-content: space-around;
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
